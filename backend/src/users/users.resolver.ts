import { Query, Resolver } from "@nestjs/graphql";
import { User } from "../common/models/users.model";

@Resolver(of => User)
export class UserResolver {

    @Query(returns => User)
     user()  {
        return {name: 'Test Resolver', email: "This is a test query!"}
    }
}