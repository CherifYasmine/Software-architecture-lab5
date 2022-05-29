import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { EventPattern, Payload, Transport } from '@nestjs/microservices';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @EventPattern('add-new-user', Transport.REDIS)
  create(@Payload() user: User) {
    return this.userService.create(user);
  }
  @EventPattern('delete-user', Transport.REDIS)
  remove(@Payload() id: string) {
    return this.userService.remove(id);
  }
}
