import { IsDecimal, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Double } from "typeorm";

export class ProductDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    qte: number;

    
}