import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service'; 
import { Prisma } from '@prisma/client'; // Prisma Client의 타입 사용

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  // 전자 지갑에 금액 충전 메서드
  async deposit(userId: number, amount: number): Promise<string> {
    if (amount <= 0) {
      throw new Error('충전 금액은 0보다 커야 합니다.');
    }

    // 사용자 지갑을 조회
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId: userId },
    });

    if (!wallet) {
      throw new Error('지갑을 찾을 수 없습니다.');
    }

    // 지갑의 잔액을 업데이트
    await this.prisma.wallet.update({
      where: { userId: userId },
      data: { balance: wallet.balance + amount },
    });

    // 거래 내역 기록 (선택 사항)
    await this.prisma.transaction.create({
      data: {
        walletId: wallet.id,
        amount: amount,
        type: 'DEPOSIT', // 거래 유형을 DEPOSIT으로 설정
      },
    });

    return `사용자 ${userId}의 지갑에 ${amount}원이 충전되었습니다.`;
  }
}
