import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('item')
export class Item{

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 100})
    title: string

    @Column({type: 'text'})
    description: string

    @Column({nullable: false})
    item_image: string

    @ManyToOne(() => User, {eager: true})
    owner: User

    @Column({default:false})
    reserved: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}