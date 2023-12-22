import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './user.schema';
import { UserRepository } from './user.repository';

@Module({
    imports: [MongooseModule.forFeature([{name:Users.name, schema:UsersSchema}])],
    providers: [UsersService,UserRepository],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule {}
