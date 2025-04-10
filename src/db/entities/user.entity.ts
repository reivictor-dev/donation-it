import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column({length:100})
    name: string

    @Column({nullable: false, unique: true})
    email: string

    @Column({nullable: false, length: 100})
    password: string

    @CreateDateColumn()
    created_at: Date
}