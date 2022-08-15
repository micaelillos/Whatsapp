import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { MainModule } from './main/main.module';
import { TimedModule } from './timed/timed.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
    }),
    UsersModule,
    MainModule,
    TimedModule,
  ],
  controllers: [AppController],
})
export class AppModule { }
