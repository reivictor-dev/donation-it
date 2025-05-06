import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Item } from "./item.entity";

@Entity('donation-history')
export class DonationHistory{

    @PrimaryGeneratedColumn()
    id: Number

    @ManyToOne(() => User, {eager:true})
    donor: User

    @ManyToOne(() => User, {eager: true})
    receiver: User

    @ManyToOne(() => Item, {eager: true})
    item: Item

    @CreateDateColumn()
    date: Date
}