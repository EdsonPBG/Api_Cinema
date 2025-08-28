import { Column, DataType, Default, PrimaryKey, Table, Model } from "sequelize-typescript";
import { CreateUsersDto } from "../dto/create-users.dto";

@Table({
    tableName: "users",
    timestamps: true,
})

export class Users extends Model<Users, CreateUsersDto> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    public user_id: string; 

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
    })
    number: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
    })
    active: boolean;
}