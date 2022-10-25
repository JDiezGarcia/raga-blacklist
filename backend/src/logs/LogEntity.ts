import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from "typeorm";
import { Length, IsString, IsDateString, IsOptional} from "class-validator";
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

    @Column({nullable: true})
    @IsOptional()
    @Length(10, 250)
    @IsString()
    employee: string;

    @ManyToOne(() => Contact, (contact) => contact.logs, { onDelete: 'CASCADE' })
    contact: Contact;
}