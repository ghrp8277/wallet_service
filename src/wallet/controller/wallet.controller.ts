import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { WalletService } from '../service/wallet.service';
import { CreateWalletRequest } from '@/requests/create-wallet.request';
import { DepositRequest } from '@/requests/deposit.request';
import { WithdrawRequest } from '@/requests/withdraw.request';
import { GetWalletRequest } from '@/requests/get-wallet.request';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @GrpcMethod('WalletService', 'healthCheck')
  healthCheck() {
    return { status: 'OK' };
  }

  @GrpcMethod('WalletService', 'createWallet')
  async createWallet(data: CreateWalletRequest) {
    const result = await this.walletService.createWallet(data);
    return { result: JSON.stringify(result) };
  }

  @GrpcMethod('WalletService', 'getWallet')
  async getWallet(data: GetWalletRequest) {
    const result = await this.walletService.getWalletByWalletId(data);
    return { result: JSON.stringify(result) };
  }

  @GrpcMethod('WalletService', 'deposit')
  async deposit(data: DepositRequest) {
    const result = await this.walletService.deposit(data);
    return { result: JSON.stringify(result) };
  }

  @GrpcMethod('WalletService', 'withdraw')
  async withdraw(data: WithdrawRequest) {
    const result = await this.walletService.withdraw(data);
    return { result: JSON.stringify(result) };
  }
}
