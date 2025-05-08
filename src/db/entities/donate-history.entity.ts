import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Item } from "./item.entity";

export type DonationStatus = 'PENDING' | 'COMPLETED';

@Entity('donation-history')
export class DonationHistory{

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, {eager:true})
    donor: User

    @ManyToOne(() => User, {eager: true})
    receiver: User

    @ManyToOne(() => Item, {eager: true})
    item: Item

    @Column({type: 'enum',
        enum: ['PENDING', 'COMPLETED'],
        default: 'PENDING'
    })
    status: DonationStatus

    @CreateDateColumn()
    date: Date
}