import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("notes")
export class Note extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column("varchar")
    title?: string;

    @Column("text")
    description?: string;
    
    @Column("timestamp")
    createdAt?: Date;

    @Column()
    userId?: number;

    @ManyToOne(() => User, user => user.notes)
    user?: User;

}