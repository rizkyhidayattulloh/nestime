import { Controller, Get } from '@nestjs/common';
import { SampleService } from '@/modules/sample/sample.service';

@Controller()
export class SampleController {
    constructor(private readonly sampleService: SampleService) {}

    @Get()
    index() {
        return this.sampleService.getHello();
    }
}
