import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "enum",
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    })
    role: string

    @Column({length:100})
    name: string

    @Column({nullable: false, unique: true})
    email: string

    @Column({nullable: false, length: 100})
    password: string

    @Column({nullable: true})
    profile_img: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}