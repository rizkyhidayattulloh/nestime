import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class SampleController {
    @EventPattern('sample')
    async sample(data: Record<string, unknown>) {
        console.log(data);
    }
}
