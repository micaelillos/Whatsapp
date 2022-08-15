import { Injectable } from "@nestjs/common";
import { PubSub as pubsub } from "graphql-subscriptions";

@Injectable()
export default class PubSub extends pubsub {}
