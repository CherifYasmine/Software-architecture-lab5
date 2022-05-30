import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Post('passer-commande')
    async passerCommande(@Body() dto: ProductDto) {
        const user = this.productService.passerCommande(dto);
        return user;
    } 

    @Delete('delete-commande/:id')
    async deleteCommande(@Param() params){
        return this.productService.deleteCommande(params.id);
    }

    @MessagePattern({cmd: 'notifications-Commande'})
    async getNotificationsAboutCommande(name: string) {
        console.log(`Channel: ${name}`);   
    }
}
