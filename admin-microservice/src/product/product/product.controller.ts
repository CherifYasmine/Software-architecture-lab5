import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../schemas/product.schema';
import { UpdateProductDto } from '../dto/update-product.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  getProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }
  @Post('/publish-product')
  create(@Body() product: CreateProductDto): CreateProductDto {
    return this.productService.create(product);
  }
  @Post('/update/:id')
  async update(@Body() updateProduct: UpdateProductDto, @Param() params) {
    return await this.productService.update(params.id, updateProduct);
  }
  @EventPattern('product-edit')
  async handleClient(data: Record<string, string>) {
    await this.productService.updateQuantity(data.name, data.quantity);
  }
}
