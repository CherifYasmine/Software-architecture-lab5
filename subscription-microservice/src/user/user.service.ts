import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<User>,
    @Inject('REDISCLIENT') private readonly redisClient: ClientProxy,
    ){}
    async create(createUserDto: CreateUserDto): Promise<User> {
      const newProduct = new this.userModel(createUserDto);
      this.redisClient.emit('add-new-user',createUserDto)
      return await newProduct.save();
  }
  async remove(id: string): Promise<User>  {
    this.redisClient.emit('delete-user',id)
    return await this.userModel.findByIdAndRemove(id)
  }
  

 
}
