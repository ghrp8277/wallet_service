import { Module } from '@nestjs/common'
import { WalletController } from './controller/wallet.controller'
import { WalletService } from './service/wallet.service'
import { PrismaService } from '@/prisma/prisma.service'

@Module({
    controllers: [WalletController],
    providers: [WalletService, PrismaService],
})
export class WalletModule {}
