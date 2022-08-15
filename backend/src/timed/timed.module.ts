import { Module } from '@nestjs/common';
import { MainModule } from 'src/main/main.module';
import { MainService } from 'src/main/main.service';
import { TimedResolver } from './timed.resolver';
import { TimedService } from './timed.service';

@Module({
   imports: [MainModule] ,
    providers:[TimedService,TimedResolver]})
export class TimedModule {}
