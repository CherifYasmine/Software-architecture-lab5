import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost/subscription"), UserModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
