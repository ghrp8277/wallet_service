import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { TransactionType, TransactionStatus, WalletStatus, Currency } from '@prisma/client';
import { hashPassword } from '@/utils/hash.util';
import {
  InsufficientBalanceException,
  InvalidAmountException,
  WalletAlreadyExistsException,
  WalletNotFoundException,
} from '@/exceptions';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  private async findWalletByUserId(userId: number) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId: userId },
    });

    if (!wallet) {
      throw new WalletNotFoundException();
    }

    return wallet;
  }

  private async createNewWallet(userId: number, currency: Currency, password: string, isDefault: boolean) {
    const hashedPassword = await hashPassword(password);
    return await this.prisma.wallet.create({
      data: {
        userId: userId,
        balance: 0,
        status: WalletStatus.ACTIVE,
        currency: currency,
        password: hashedPassword,
        isDefault: isDefault,
      },
    });
  }

  private async checkDuplicateWallet(userId: number) {
    const existingWallet = await this.prisma.wallet.findUnique({
      where: { userId: userId },
    });

    if (existingWallet) {
      throw new WalletAlreadyExistsException();
    }
  }

  public async createWallet(
    userId: number,
    currency: Currency,
    password: string,
    isDefault: boolean,
  ): Promise<{ walletId: number }> {
    await this.checkDuplicateWallet(userId);
    const wallet = await this.createNewWallet(userId, currency, password, isDefault);

    return {
      walletId: wallet.id,
    };
  }

  private async updateWalletPassword(walletId: number, newPassword: string) {
    const hashedPassword = await hashPassword(newPassword);

    await this.prisma.wallet.update({
      where: { id: walletId },
      data: {
        password: hashedPassword,
      },
    });
  }

  public async resetPassword(userId: number, newPassword: string): Promise<void> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      throw new WalletNotFoundException();
    }

    await this.updateWalletPassword(wallet.id, newPassword);
  }

  private async updateWalletBalance(walletId: number, newBalance: number) {
    return this.prisma.wallet.update({
      where: { id: walletId },
      data: { balance: newBalance },
    });
  }

  private async createTransaction(walletId: number, amount: number, type: TransactionType, createdBy: number) {
    return this.prisma.transaction.create({
      data: {
        walletId: walletId,
        amount: amount,
        type: type,
        status: TransactionStatus.COMPLETED,
        createdBy: createdBy,
      },
    });
  }

  public async deposit(userId: number, amount: number): Promise<{ balance: number; transactionId: number }> {
    if (amount <= 0) {
      throw new InvalidAmountException();
    }

    const wallet = await this.findWalletByUserId(userId);
    const updatedWallet = await this.updateWalletBalance(wallet.id, wallet.balance + amount);
    const transaction = await this.createTransaction(wallet.id, amount, TransactionType.DEPOSIT, userId);

    return { balance: updatedWallet.balance, transactionId: transaction.id };
  }

  public async withdraw(userId: number, amount: number): Promise<{ balance: number; transactionId: number }> {
    if (amount <= 0) {
      throw new InvalidAmountException();
    }

    const wallet = await this.findWalletByUserId(userId);

    if (wallet.balance < amount) {
      throw new InsufficientBalanceException();
    }

    const updatedWallet = await this.updateWalletBalance(wallet.id, wallet.balance - amount);
    const transaction = await this.createTransaction(wallet.id, amount, TransactionType.WITHDRAWAL, userId);

    return { balance: updatedWallet.balance, transactionId: transaction.id };
  }
}
