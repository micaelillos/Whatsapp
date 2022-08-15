import { Field, ObjectType } from "@nestjs/graphql";
import { Chat as chat, GroupMetadata, MessageId} from "@wppconnect-team/wppconnect";
import { Presence } from "@wppconnect-team/wppconnect/dist/api/model/presence";
import { Contact, Id } from "./contact.model";

@ObjectType()
export class Chat implements chat{
    @Field({nullable:true})
    contact: Contact;
    @Field({nullable:true})
    name: string;
    @Field({nullable:true})
    id: Id;
    @Field({nullable:true})
    isGroup: boolean;
    @Field({nullable:true})
    isOnline: boolean;

    lastReceivedKey: MessageId;
    isAnnounceGrpRestrict: boolean;
    changeNumberNewJid: Id;
    changeNumberOldJid: Id;
    ephemeralDuration: number;
    ephemeralSettingTimestamp: number;
    groupMetadata: GroupMetadata;
    isReadOnly: boolean;
    kind: string;
    lastSeen: number | boolean;
    modifyTag: number;
    msgs: null;
    muteExpiration: number;
    notSpam: boolean;
    pendingMsgs: boolean;
    pin: number;
    presence: Presence;
    t: number;
    unreadCount: number;
    hasChatBeenOpened: boolean;
    unreadMentionCount: number;
    hasUnreadMention: boolean;
    archiveAtMentionViewedInDrawer: boolean;
    isBroadcast: boolean;
    isUser: boolean;
    archive: boolean;
}