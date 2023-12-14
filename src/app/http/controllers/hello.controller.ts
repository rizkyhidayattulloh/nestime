import {
    Controller,
    Get,
    OnApplicationShutdown,
    OnModuleInit,
} from '@nestjs/common';
// import { UserService as MUserService } from '@/modules/user/user.service';
// import { UserServiceClient } from '@/proto/user/user.pb';
// import { ServerErrorResponse } from '@grpc/grpc-js';
// import { InjectQueue } from '@nestjs/bull';
// import { ClientGrpc, ClientKafka } from '@nestjs/microservices';
// import { Queue } from 'bull';
// import { Request } from 'express';
// import { lastValueFrom } from 'rxjs';

@Controller()
export class HelloController implements OnModuleInit, OnApplicationShutdown {
    // private grpcUserService: UserServiceClient;

    // constructor(
    //     @InjectQueue('demo') private demoQueue: Queue,
    //     @Inject('KAFKA_SERVICE') private client: ClientKafka,
    //     @Inject('GRPC_SERVICE') private grpcClient: ClientGrpc,
    //     private userService: MUserService,
    // ) {}

    async onApplicationShutdown() {
        //     await this.client.close();
    }

    async onModuleInit() {
        //     this.client.subscribeToResponseOf('demo');
        //     await this.client.connect();
        //     this.grpcUserService =
        //         this.grpcClient.getService<UserServiceClient>('UserService');
    }

    @Get()
    async index() {
        return 'Hello World!';
    }
}
