import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Users {
  @Prop({ unique: true }) // Додайте цей рядок для унікального індексу
  email: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;
}

export type UsersDocument = HydratedDocument<Users>;

export const UsersSchema = SchemaFactory.createForClass(Users);
 