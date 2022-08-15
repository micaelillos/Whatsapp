import { Args, Mutation, ObjectType, Query, Resolver, Subscription } from "@nestjs/graphql";
import { Chat } from "src/common/models/chat.model";
import PubSub from "src/common/services/pubsub.service";
import { connectionStatus } from "src/common/types/main";
import { MainService } from "./main.service";


export const pubsub = new PubSub()

@Resolver()
export class MainResolver {

    constructor(private mainService: MainService, private pubSub: PubSub) { }

    @Mutation(() => String)
    connect() {
        this.mainService.start()
        return "Sent Connection"
    }

    @Mutation(() => String)
    async disconnect() {
        const loggedOff = await this.mainService.stop();
        if (loggedOff) {
            pubsub.publish('connectionStatus', { msg: connectionStatus.DISCONNECTED })
            return connectionStatus.DISCONNECTED
        }
        else return connectionStatus.ERROR
    }

    @Query(() => String)
    getStatus() {
        return this.mainService.client &&
            this.mainService.client.isConnected()
            ? connectionStatus.CONNECTED : connectionStatus.DISCONNECTED
    }

    @Subscription(() => String, {
        resolve(payload, args, context, info) {
            return payload.msg
        },
    })
    connectionStatus() {
        return pubsub.asyncIterator('connectionStatus');
    }

    @Subscription(() => String, {
        resolve(payload, args, context, info) {
            return payload.qrCode
        },
    })
    getQrCode() {
        return pubsub.asyncIterator('qrCode');
    }

    @Query(() => [Chat])
    async getAllChats() {
        return await this.mainService.getAllChats();
    }

    @Query(() => [Chat])
    async getAllGroups() {
        return await this.mainService.client.getAllGroups();
    }


    @Query(() => String)
    async getChatProfilePic(
        @Args({ name: 'chatId', type: () => String }) chatId: string,
    ) {
        return await this.mainService.client.getProfilePicFromServer(chatId);
    }

    @Mutation(() => String)
    stopOnlineInterval() {
        this.mainService.killOnlineInterval()
        return "Stopped"
    }

    @Subscription(() => [Chat], {
        resolve(payload, args, context, info) {
            return payload.onlineChats
        }
    })
    async getOnline() {
        return this.pubSub.asyncIterator('onlineChats')
    }
}