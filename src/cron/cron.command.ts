import { Command, CommandRunner } from "nest-commander";
import { CronService } from "./cron.service";


@Command({ name: 'cron', description: 'To Execute The Cron job via command line' })
export class CronCommand implements CommandRunner {
    
    constructor(
        private cronService: CronService
    ){}
    
    async run(
        inputs: string[],
        options: Record<string, any>
    ): Promise<void>{
        await this.cronService.handleCron();
    }
}