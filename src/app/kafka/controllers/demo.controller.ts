import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class DemoController {
    @MessagePattern('demo')
    async sayHello(data: { name: string }) {
        console.log(data);
        return `Hello ${data.name}`;
    }

    @EventPattern('demo')
    async sayHelloEvent(data: { name: string }) {
        console.log(data);
    }
}
