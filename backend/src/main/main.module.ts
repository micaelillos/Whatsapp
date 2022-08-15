import { Module } from '@nestjs/common';
import PubSub from 'src/common/services/pubsub.service';
import { MainResolver } from './main.resolver';
import { MainService } from './main.service';

@Module({
    providers:[MainResolver, MainService, PubSub],
    imports: [],
    exports: [MainService]
})
export class MainModule {}
