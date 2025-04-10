import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('location')
export class Location{
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 255})
    address: string

    @Column('decimal',{ precision: 9, scale: 6})
    latitude: number

    @Column('decimal',{ precision: 9, scale: 6})
    longitude: number
}