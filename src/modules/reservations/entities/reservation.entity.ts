import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { CreateReservationDto } from "../dto/create-reservation.dto";
import { Users } from "src/modules/users/entities/users.entity";
import { MovieSession } from "src/modules/session/entities/session.entity";
import { Seat } from "src/modules/seats/entities/seat.entity";

export interface ReservationCreationAttributes {
    user_id: string;
    session_id: string;
    total_price: number;
}

@Table({
    tableName: "Reservation",
    timestamps: true
})

export class Reservation extends Model<Reservation, ReservationCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    public reservation_id: string;

    @ForeignKey(() => Users)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    user_id: string;

    @BelongsTo(() => Users)
    user: Users

    @ForeignKey(() => MovieSession)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    session_id: string;

    @BelongsTo(() => MovieSession)
    session: MovieSession

    @Column({
        type: DataType.DECIMAL(10, 2)
    })
    total_price: number;

    @Column({
        type: DataType.ENUM,
        values: ["Pendente", "Confirmado", "Cancelado"],
        defaultValue: "Pendente",
    })
    status: string;
}
