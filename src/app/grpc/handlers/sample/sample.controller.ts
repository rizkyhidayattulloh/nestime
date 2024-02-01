import { Controller } from '@nestjs/common';
import {
    SampleMessage,
    SampleServiceController,
    SampleServiceControllerMethods,
} from '@/app/grpc/gen-proto/sample/sample.pb';
import { SampleService } from '@/modules/sample/sample.service';

@Controller()
@SampleServiceControllerMethods()
export class SampleController implements SampleServiceController {
    constructor(private readonly sampleService: SampleService) {}

    async getHello(): Promise<SampleMessage> {
        return {
            message: this.sampleService.getHello(),
        };
    }
}
