import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { Ctx, MessagePattern, RedisContext, Transport } from '@nestjs/microservices';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post('add')
    async addUser(@Body() dto: UserDto) {
        const user = this.userService.addUser(dto);
        return user;
    } 

    @Delete('delete-user/:id')
    async deleteUser(@Param() params){
        return this.userService.deleteUser(params.id);
    }
}
