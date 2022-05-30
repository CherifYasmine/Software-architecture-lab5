import { Column, Double, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    qte: number;
}