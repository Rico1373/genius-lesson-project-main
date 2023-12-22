import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { Users, UsersSchema } from './users/user.schema';


@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin228@cluster0.gmw1yql.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{name:Users.name, schema:UsersSchema}]),

    UsersModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
