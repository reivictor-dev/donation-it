import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Location } from "./location.entity";

@Entity('donation_item')
export class DonationItem{

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 100})
    title: string

    @Column({type: 'text'})
    description: string

    @Column({nullable: true})
    url_image: string

    @ManyToOne(() => User, {eager: true})
    owner: User

    @ManyToOne(() => Location, {eager: true})
    location: Location

    @Column({default:false})
    reserved: boolean

    @CreateDateColumn()
    created_at: Date
}