import { Inject, Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('product') private readonly productModel: Model<Product>,
    @Inject('REDISCLIENT') private readonly redisClient: ClientProxy,
    ){}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    this.redisClient.emit('add-new-product',createProductDto)
    return await newProduct.save();
  }
  async findAll(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productModel.findOne({ _id: id })
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product>  {
    return await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true})
  }
  async reduce_quantity(id:string){
    const updated = await this.productModel.findById(id)
    if (updated === null) {
      throw new NotFoundException('product not found');
    }
    if (updated.quantity == 0) {
      throw new MethodNotAllowedException('can t buy this product for the moment');
    } else {
      updated.quantity -= 1;
      return await updated.save();
    }
  }

  async remove(id: string): Promise<Product>  {
    this.redisClient.emit('delete-product',id)
    return await this.productModel.findByIdAndRemove(id)
  }
}
