import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { UserDTO } from "@DTO/UserDTO";
import { IUser } from "@Interface/IUser";
import { TABLE_NAME } from "@Constants/DBConstants";
import { MessageCategory } from "@Model/MessageCategory";

@Entity("gs_user")
export class User implements IUser {
    constructor(userDto?: UserDTO) {
		this.id = userDto?.id;
		this.email = userDto?.email;
		this.mobile = userDto?.mobile;
        this.name = userDto?.name;
    }

    @PrimaryGeneratedColumn("uuid")
    public id?: string;

    @Column()
    public name: string;

	@Column()
    public email: string;

	@Column()
    public mobile: string;

    @ManyToMany(() => MessageCategory)
    @JoinTable({
        name: TABLE_NAME.USER_MESSAGE_CATEGORY_MAP,
        joinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "message_category_id",
            referencedColumnName: "id"
        }
    })
    messageCategories: MessageCategory[];

}
