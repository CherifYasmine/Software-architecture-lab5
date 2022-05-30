import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
  ClientsModule.register([
    {
      name: 'GREETING_SERVICE',
      transport: Transport.REDIS,
      options: { port: 6379 },
    },
  ]),],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
