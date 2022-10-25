import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    Unique
} from "typeorm";
import { Length, IsEmail, IsString, IsBoolean, IsOptional} from "class-validator";
import { Log } from "../logs/LogEntity";

@Entity()
@Unique('dni', ['dni'])
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 50)
    @IsString()
    name: string;

    @Column()
    @Length(4, 50)
    @IsString()
    lastName: string;

    @Column({nullable: true})
    @IsOptional()
    @Length(9, 9)
    @IsString()
    dni: string;

    @Column({ nullable: true })
    @IsOptional()
    @Length(3, 50)
    @IsEmail()
    email: string;

    @Column()
    @Length(9, 13)
    @IsString()
    phone: string;

    @Column({default: false})
    @IsBoolean()
    expelled: boolean = false;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Log, (log) => log.contact)
    logs: Log[];

}