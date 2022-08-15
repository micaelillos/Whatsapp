import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Timed } from "../common/models/timed.model";
import { TimedService } from "./timed.service";

@Resolver()
export class TimedResolver {

    constructor(private timedService: TimedService){}
    @Mutation(() => String)
    addTimedMesage(
    @Args({name: 'chatId', type: () => String}) chatId: string, 
    @Args({name: 'message', type: () => String}) message: string,
    @Args({name: 'time', type: () => Date}) time: Date 
    ) {
        this.timedService.addTimedMessage({chatId, message, time});
        return `Timed Message: ${message} added to ${chatId} at ${time}`
    }

    @Query(() => [Timed])
    getScheduledMessages(){
        return Array.from(this.timedService.timedMessages.values());
    }

}