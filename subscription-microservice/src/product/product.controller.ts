import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EventPattern, MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern('add-new-product', Transport.REDIS)
  create(@Payload() product: Product) {
    return this.productService.create(product);
  }

  @MessagePattern({cmd: 'greeting'})
  getGreetingMessage(name: string): string {
    return `Hello ${name}`;
  }
  @MessagePattern({ cmd: 'products' })
  findAll(): Promise<Product[]> {
    console.log(this.productService.findAll())
    return this.productService.findAll();
  }

  @EventPattern('get-product', Transport.REDIS)
  findOne(@Payload() id: string) {
    return this.productService.findOne(id);
  }

  @EventPattern('update-product', Transport.REDIS)
  update(@Payload() payload: { id: string; product: Product }) {
    const { id, product } = payload;
    return this.productService.update(id, product);
  }

  @EventPattern('delete-product', Transport.REDIS)
  remove(@Payload() id: string) {
    return this.productService.remove(id);
  }
  @EventPattern('command', Transport.REDIS)
  reduce_quantity(@Payload() id:string){
    return this.productService.reduce_quantity(id);
  }
}
