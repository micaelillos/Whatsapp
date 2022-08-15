import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { catchError, map, of, Subject } from "rxjs";
import { addTimedMessageMutation, sendConnectionMutation } from "../gql/mutations.gql";
import { getAllChatsQuery, getConnectionStatusQuery, getScheduledMessagesQuery } from "../gql/querys.gql";
import { connectionStatusSub, getOnlineSub, getQrCodeSub } from "../gql/subscriptions.gql";
import { Chat } from "../types/chat.model";
import { Contact } from "../types/contact.model";
import { Status } from "../types/Status.model";
import { Timed } from "../types/timed.model";



@Injectable({ providedIn: 'root' })
export class ApiService {

    contacts$ = new Subject<Contact[]>();
    qrcode$ = new Subject<string | undefined>();
    status$ = new Subject<Status | undefined>();
    connected: boolean = false;

    constructor(private apollo: Apollo) { }

    connect() {
        this.apollo.mutate<{ connect: string }>({ mutation: sendConnectionMutation })
            .pipe(
                map(res => res.data?.connect),
                catchError(err => {
                    return of('')
                })
            )
            .subscribe(res => {})
    }

    getStatus = () => {
        this.apollo.subscribe<{ connectionStatus: Status }>({ query: connectionStatusSub })
            .pipe(
                map(res => res.data?.connectionStatus),
                catchError(err => {
                    return of(undefined)
                })
            )
            .subscribe(res => {
                this.connected = res === Status.CONNECTED
                this.status$.next(res)
            })
    }

    getOnline = async () => {
        this.apollo.subscribe<{
            getOnline: { contact: Contact }[]
        }>({ query: getOnlineSub })
            .pipe(
                map(res => res.data?.getOnline),
                map(arr => arr?.map(item => item.contact) || []),
                catchError(err => {
                    return of([])
                })
            )
            .subscribe(res => this.contacts$.next(res))
    }

    getQrCode = () => {
        this.apollo.subscribe<{
            getQrCode: string
        }>({ query: getQrCodeSub })
            .pipe(
                map(res => res.data?.getQrCode),
                catchError(err => {
                    return of('')
                })
            )
            .subscribe(res => this.qrcode$.next(res))
    }

    getConnectionStatus = () => {
        return this.apollo.query<{ getStatus: Status }>({ query: getConnectionStatusQuery })
            .pipe(
                map(res => res.data?.getStatus),
                catchError(err => {
                    return of(undefined)
                })
            )
    }

    getAllChats = () => {
        return this.apollo.query<{ getAllChats: Chat[] }>({ query: getAllChatsQuery })
        .pipe(
            map(res => res.data?.getAllChats),
            catchError(err => {
                return of([])
            })
        )
    }

    getScheduledMessages = () => {
        return this.apollo.query<{ getScheduledMessages: [Timed] }>({ query: getScheduledMessagesQuery })
            .pipe(
                map(res => res.data?.getScheduledMessages),
                catchError(err => {
                    return of([])
                })
            )
    }

    setScheduledMessage = (timed: Timed) => {
        return this.apollo.mutate<{ addTimedMesage: string }>
            ({
                mutation: addTimedMessageMutation, variables: {
                    chatId: timed.chatId,
                    message: timed.message,
                    time: timed.time
                }
            })
            .pipe(
                map(res => res.data?.addTimedMesage),
                catchError(err => {
                    return of('')
                })
            )
    }

}