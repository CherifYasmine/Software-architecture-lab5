import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @Inject('REDISCLIENT') private productProxy: ClientProxy
    ) {}

    async passerCommande(dto: ProductDto) {
        const user = this.productRepository.save({
            name: dto.name,
            price: dto.price,
            qte: dto.qte
        });
        this.emit('Commande-create', {body: 'A reservation has been created.'});
        return user;
    }

    async deleteCommande(id: number) {
        const product = this.productRepository.delete({id: id});
        this.emit('Commande-delete', {body: 'A reservation has been deleted.'});
        return product;
    }
    emit(arg0: string, arg1: { body: string; }) {
        throw new Error('Method not implemented.');
    }
}

