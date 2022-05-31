import { Inject, Injectable } from '@nestjs/common';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../schemas/product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('REDISCLIENT') private client: ClientProxy,
    @InjectModel(Product.name) private ProductModel: Model<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    const newProduct = new this.ProductModel(createProductDto);
    newProduct.save();
    this.client.emit('add-new-product', {
      name: createProductDto.name,
      price: String(createProductDto.price),
      quantity: String(createProductDto.quantity),
    });

    return newProduct;
  }
  async delete(id: string){
    this.client.emit('delete-product',id)
    return await this.ProductModel.findByIdAndRemove(id)

  }
  async findAll() {
    return this.ProductModel.find();
  }

  async findOne(id: number) {
    return this.ProductModel.findOne({ _id: id });
  }

  // async update(id: string, updateProductDto: UpdateProductDto) {
  //   this.client.emit('product-client', {
  //     name: updateProductDto.name,
  //     quantity: String(updateProductDto.quantity),
  //     price: String(updateProductDto.price),
  //   });

  //   const product = await this.ProductModel.findByIdAndUpdate(
  //     id,
  //     updateProductDto,
  //   );
  //   return 'done';
  // }
  async updateQuantity(name: string, quantity: string) {
    const product = await this.ProductModel.findOne({ name: name });
    const productUpdated = await this.ProductModel.findByIdAndUpdate(
      { _id: product._id },
      { quantity: product.quantity - Number(quantity) },
    );
    return 'done';
  }
}
