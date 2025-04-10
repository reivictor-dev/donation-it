import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class Category{
    @PrimaryGeneratedColumn()
    id: number

    @Column({length:30, unique: true})
    name: string
}