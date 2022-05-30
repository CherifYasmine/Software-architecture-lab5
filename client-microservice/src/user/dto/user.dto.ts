import { IsNotEmpty, IsNumber, IsString, IsDecimal, IsEmail } from "class-validator";
import { Double } from "typeorm";

export class UserDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;
}