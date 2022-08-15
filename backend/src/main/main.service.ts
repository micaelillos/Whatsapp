import { Injectable } from "@nestjs/common";
import { pubsub } from "./main.resolver";
import * as wpp from '@wppconnect-team/wppconnect'
import { CatchQRCallback } from "@wppconnect-team/wppconnect";
import PubSub from "src/common/services/pubsub.service";
import { connectionStatus } from "src/common/types/main";



@Injectable()
export class MainService {
    client!: wpp.Whatsapp
    chats: wpp.Chat[] = []
    onlineChats: wpp.Chat[] = []
    getOnlineInterval: NodeJS.Timer
    ONLINE_INTERVAL = 3000

    constructor(public pubSub: PubSub) { }

    start = (session = 'default') => {
        wpp.create({
            session, catchQR: this.catchQR,
            headless: true,
            puppeteerOptions: {
                executablePath: process.env.CHROME_BIN || null,
                args: ['--no-sandbox', '--headless', '--disable-gpu']
            }
        }).then(client => {
            this.client = client
            console.log('client started ')
            this.client.setOnlinePresence(false);
            this.getCurrentOnlineChats()
            this.connectionStatus(true)
        })
            .catch(err => this.connectionStatus(false))
    }

    async stop() {
        const res = await this.client.close()
        if (res) {
            this.killOnlineInterval()
            this.client = null
            console.log('client stopped ', this.client)
        }
        return res
    }

    catchQR: CatchQRCallback = (qrCode) => {
        pubsub.publish('qrCode', { qrCode })
    }

    connectionStatus = (connected) => {
        if (connected)
            pubsub.publish('connectionStatus', { msg: connectionStatus.CONNECTED })
        else
            pubsub.publish('connectionStatus', { msg: connectionStatus.DISCONNECTED })
    }


    getAllChats = async () => {
        return await this.client?.getAllChats()
    }

    getAllOnlineChats = async () => {
        const res = [];
        if (!this.chats || this.chats?.length === 0)
            this.chats = await this.getAllChats()
        for (let chat of this.chats || []) {
            let chatId = chat.contact.id._serialized;
            let isOnline = chatId && await this.client?.getChatIsOnline(chatId)
            if (isOnline && !chat.isGroup) {
                if (!chat.contact.profilePicThumbObj.imgFull)
                    chat.contact.profilePicThumbObj = await this.client?.getProfilePicFromServer(chatId);
                res.push(chat)
            }
        }
        this.onlineChats = res;
        return res;
    }

    getCurrentOnlineChats = () => {
        this.getOnlineInterval = setInterval(async () => {
            let onlineChats = await this.getAllOnlineChats()
            this.pubSub.publish('onlineChats', { onlineChats })
        }, this.ONLINE_INTERVAL)
    }

    killOnlineInterval = () => {
        clearInterval(this.getOnlineInterval)
    }

    sendMessage = async (chatId: string, message: string) => {
        await this.client.sendText(chatId, message)
    }
}