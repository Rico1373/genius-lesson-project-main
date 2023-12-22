import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './user.schema';
import { createUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersModel.find().exec();
  }

  async findOneByEmail(email: string): Promise<Users | null> {
    return this.usersModel.findOne({ email }).exec();
  }

  async findOneById(id: string): Promise<Users | null> {
    return this.usersModel.findById({ id });
  }

  async create(dto: createUserDto): Promise<Users> {
    const existingUser = await this.usersModel.findOne({ email: dto.email });

    if (existingUser) {
      throw new Error(`User with email ${dto.email} already exists`);
    }

    const createdUser = new this.usersModel(dto);
    return createdUser.save();
  }

  async update(id: string, updatedUser: Users): Promise<Users | null> {
    return this.usersModel
      .findByIdAndUpdate(id, updatedUser, { new: true })
      .exec();
  }

  async delete(id: string): Promise<String> {
    const deletedUser = await this.usersModel.findByIdAndDelete(id).exec();

    if (!deletedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return 'User Deleted Successful';
  }
}
