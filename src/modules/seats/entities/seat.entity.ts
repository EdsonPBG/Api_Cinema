import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { CreateSeatDto } from "../dto/create-seat.dto";
import { MovieSession } from "src/modules/session/entities/session.entity";
import { Reservation } from "src/modules/reservations/entities/reservation.entity";

@Table({
    tableName: "seats",
    timestamps: true
})
export class Seat extends Model<Seat, CreateSeatDto> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    public seat_id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    seat_number: string;

    @Column({
        type: DataType.ENUM,
        values: ["Disponivel", "Bloqueado", "Agendado"],
        defaultValue: "Disponivel"
    })
    status: string;

    @ForeignKey(() => MovieSession)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    session_id: string;

    @BelongsTo(() => MovieSession)
    session: MovieSession

    @ForeignKey(() => Reservation)
    @Column(DataType.UUID)
    reservation_id: string;

    @BelongsTo(() => Reservation)
    reservation: Reservation;
}