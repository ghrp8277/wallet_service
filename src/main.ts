import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const grpcUrl = configService.get<string>('GRPC_URL');
  const grpcPackage = configService.get<string>('GRPC_PACKAGE');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: grpcPackage,
      protoPath: join(__dirname, './protos/wallet.proto'),
      url: grpcUrl,
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
