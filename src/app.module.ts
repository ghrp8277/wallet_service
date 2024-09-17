import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { WalletModule } from './wallet/wallet.module'
import { PrismaService } from './prisma/prisma.service'

@Module({
    imports: [WalletModule],
    controllers: [AppController],
    providers: [AppService, PrismaService],
    exports: [PrismaService],
})
export class AppModule {}
