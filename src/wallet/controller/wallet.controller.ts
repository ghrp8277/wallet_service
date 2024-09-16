import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('wallet')
export class WalletController {
    @GrpcMethod('WalletService', 'getUsers')
    getUsers() {
        return {
            users: [
                {
                    id: 1,
                    name: 'Kodali'
                }
            ]
        }
    }
}
