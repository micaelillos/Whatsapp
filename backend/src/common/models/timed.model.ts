import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class Timed {
    @Field()
    chatId: string
    @Field()
    time: Date
    @Field()
    message: string
}