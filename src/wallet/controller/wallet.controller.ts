import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { WalletService } from '../service/wallet.service';
import { CreateWalletRequest } from '@/requests/create-wallet.request';
import { DepositRequest } from '@/requests/deposit.request';
import { WithdrawRequest } from '@/requests/withdraw.request';

@Controller('wallet')
export class WalletController {
    constructor(private readonly walletService: WalletService) {}

    @GrpcMethod('WalletService', 'healthCheck')
    healthCheck() {
        return { status: 'OK' };
    }

    @GrpcMethod('WalletService', 'createWallet')
    async createWallet(data: CreateWalletRequest) {
        const result = await this.walletService.createWallet(
            data.userId,
            data.currency as any,
            data.password,
            data.isDefault,
        );
        return { result: JSON.stringify(result) };
    }

    @GrpcMethod('WalletService', 'deposit')
    async deposit(data: DepositRequest) {
        const result = await this.walletService.deposit(data.userId, data.amount);
        return { result: JSON.stringify(result) };
    }

    @GrpcMethod('WalletService', 'withdraw')
    async withdraw(data: WithdrawRequest) {
        const result = await this.walletService.withdraw(data.userId, data.amount);
        return { result: JSON.stringify(result) };
    }
}
