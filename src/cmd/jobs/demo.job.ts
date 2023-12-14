import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('demo')
export class DemoJob {
    @Process()
    async handle(job: Job) {
        console.log(job.data);
    }
}
