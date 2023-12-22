import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<Users | null> {
    return this.userModel.findById(id).exec();
  }

  async create(user: Users): Promise<Users> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async update(id: string, updatedUser: Users): Promise<Users | null> {
    return this.userModel
      .findByIdAndUpdate(id, updatedUser, { new: true })
      .exec();
  }

  async delete(id: string): Promise<String> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();

    if (!deletedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return 'Deleted Successful';
  }
}
