import { Injectable } from "@nestjs/common";
import { MainService } from "src/main/main.service";
import { Timed } from "../common/models/timed.model"

@Injectable()
export class TimedService {
    timedMessages: Timed[] = []

    constructor(private main: MainService) {
        // todo getTimedMessages from DB
    }

    addTimedMessage = (timed: Timed) => {
        this.timedMessages.push(timed);
        this.setTimedMessage(timed)
    }

    fetchFromDb = (timed: Timed) => {
        // todo need to implement
    }

    saveTimedMessageDB = (timed: Timed) => {
        // todo need to implement
    }

    setTimedMessage = (timed: Timed) => {
        setTimeout(() => {
            this.main.sendMessage(timed.chatId, timed.message)
            this.removeTimedMessage(timed);
        }, timed.time.getTime() - new Date().getTime())
    }

    removeTimedMessage = (timed: Timed) => {
        this.timedMessages = this.timedMessages.filter(el =>
            el.chatId !== timed.chatId &&
            el.message !== timed.message &&
            el.time !== timed.time)
    }
}