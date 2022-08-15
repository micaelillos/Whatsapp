import { Field, ObjectType } from "@nestjs/graphql";
import { Contact as contact, Id as id, ProfilePicThumbObj as profilePicThumbObj } from "@wppconnect-team/wppconnect";

@ObjectType()
export class Id implements id {
    @Field()
    server: string;
    @Field()
    user: string;
    @Field()
    _serialized: string;
    @Field()
    fromMe: boolean;
    @Field()
    remote: string;
    @Field()
    id: string;
}

@ObjectType()
export class ProfilePicThumbObj implements profilePicThumbObj {
    @Field({ nullable: true })
    eurl: string;
    @Field({ nullable: true })
    id: Id;
    @Field({ nullable: true })
    img: string;
    @Field({ nullable: true })
    imgFull: string;
    @Field({ nullable: true })
    tag: string;

    raw: null;
}

@ObjectType()
export class Contact implements contact {
    @Field({ nullable: true })
    formattedName: string;
    @Field({ nullable: true })
    id: Id;
    @Field({ nullable: true })
    isBusiness: boolean;
    @Field({ nullable: true })
    isEnterprise: boolean;
    @Field({ nullable: true })
    profilePicThumbObj: ProfilePicThumbObj;
    @Field({ nullable: true })
    isMe: boolean;
    @Field({ nullable: true })
    isMyContact: boolean;
    @Field({ nullable: true })
    isPSA: boolean;
    @Field({ nullable: true })
    isUser: boolean;
    @Field({ nullable: true })
    isWAContact: boolean;
    @Field({ nullable: true })
    name: string;
    @Field({ nullable: true })
    plaintextDisabled: boolean;
    @Field({ nullable: true })
    pushname: string;
    @Field({ nullable: true })
    shortName: string;
    @Field({ nullable: true })
    statusMute: boolean;
    @Field({ nullable: true })
    type: string;
    @Field({ nullable: true })
    isOnline: boolean;
    @Field({ nullable: true })
    lastSeen: number;
    
    isVerified: any;
    labels: any[];
    msgs: any;
    verifiedName: any;
    isHighLevelVerified: any;
    verifiedLevel: any;
    sectionHeader: any;
}

