import { Module } from '@nestjs/common';
import { WalletController } from './controller/wallet.controller';
import { WalletService } from './service/wallet.service';

@Module({
  controllers: [WalletController],
  providers: [WalletService]
})
export class WalletModule {}
