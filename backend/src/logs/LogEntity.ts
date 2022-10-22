import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from "typeorm";
import { Length, IsString, IsDateString} from "class-validator";
import { Contact } from "../contacts/ContactEntity";

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(10, 250)
    @IsString()
    description: string;

    @Column()
    @IsDateString()
    dateLog: Date;

    @ManyToOne(() => Contact, (contact) => contact.logs)
    contact: Contact;
}