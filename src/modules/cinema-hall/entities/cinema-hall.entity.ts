import { CreateCinemaHallDto } from "../dto/create-cinema-hall.dto";
import { Column, DataType, Default, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({
    tableName: "cinema-hall",
    timestamps: true
})
export class CinemaHall extends Model<CinemaHall, CreateCinemaHallDto> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID) 
    public cinemaHall_id: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    room_number: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    seat_capacity: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    hall_type: string;

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
    })
    active: boolean
}