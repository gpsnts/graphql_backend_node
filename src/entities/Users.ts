import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ nullable: true })
	name!: string;
	@Column({ nullable: true })
	username!: string;
	@Column({ nullable: true })
	password!: string;
	@Column({ nullable: true })
	behaviour!: string;
}