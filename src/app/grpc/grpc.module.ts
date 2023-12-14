import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserModule } from '@/modules/user/user.module';

@Module({
    imports: [UserModule],
    controllers: [UserController],
    // providers: [
    //     {
    //         provide: APP_FILTER,
    //         useClass: HttpExceptionFilter,
    //     },
    // ],
})
export class GrpcModule {}
