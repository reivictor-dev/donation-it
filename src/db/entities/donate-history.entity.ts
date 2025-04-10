import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { DonationItem } from "./donate-item.entity";

@Entity('donation-history')
export class DonationHistory{

    @PrimaryGeneratedColumn()
    id: Number

    @ManyToOne(() => User, {eager:true})
    donor: User

    @ManyToOne(() => User, {eager: true})
    receiver: User

    @ManyToOne(() => DonationItem, {eager: true})
    item: DonationItem

    @CreateDateColumn()
    date: Date
}