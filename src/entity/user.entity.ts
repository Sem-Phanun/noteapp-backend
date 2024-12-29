import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Note } from "./note.entity";

@Entity('users')
export class User extends BaseEntity {
    comparePassword(password: any, password1: string) {
        throw new Error('Method not implemented.');
    }
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar")
    name!: string;

    @Column("varchar")
    email!: string;

    @Column("varchar")
    password!: string;

    @Column("timestamp")
    created_at!: Date;

    @OneToMany(() => Note, note => note.user)
    notes!: Note[]

}