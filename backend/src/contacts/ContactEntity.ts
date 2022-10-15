import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { Length, IsEmail, IsString} from "class-validator";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 50)
    @IsString()
    name: string;

    @Column()
    @Length(3, 254)
    @IsEmail()
    email: string;

    @Column()
    @Length(3, 254)
    phone: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}