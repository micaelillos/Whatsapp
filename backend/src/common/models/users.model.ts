import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class User {
    @Field()
    name: string
    @Field()
    email: string
    password: string
}