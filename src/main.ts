import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule, 
    {
      transport: Transport.GRPC,
      options: {
        package: 'walletproto',
        protoPath: join(__dirname, './protos/wallet.proto'),
        url: '0.0.0.0:50052',
      }
    }
  );
  await app.listen();
}
bootstrap();
