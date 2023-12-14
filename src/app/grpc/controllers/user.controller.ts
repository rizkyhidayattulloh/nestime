import {
    Hello,
    UserServiceController,
    UserServiceControllerMethods,
} from '@/proto/user/user.pb';
import { Metadata } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import { Payload } from '@nestjs/microservices';

@Controller()
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
    constructor(private userService: UserService) {}

    async sayHello(
        @Payload() request: Hello,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        metadata?: Metadata,
    ): Promise<Hello> {
        await this.userService.store();

        return {
            name: `Hello ${request.name}`,
        };
    }
}
