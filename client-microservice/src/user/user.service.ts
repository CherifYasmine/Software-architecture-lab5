import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @Inject('REDISCLIENT') private client: ClientProxy
    ) {}

    async addUser(dto: UserDto) {
        const user = this.userRepository.save({
            name: dto.name,
            email: dto.email
        });
        this.client.send('add-new-user', {name: 'A user has been added.'});
        return user;
    }

    async deleteUser(id: number) { 
        const user = this.userRepository.delete({id: id});
        this.client.send('delete-user', {name: 'A user has been deleted.'});
        return user;
    }
}
