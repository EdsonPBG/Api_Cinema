import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { CreateMovieSessionDto } from "../dto/create-session.dto";
import { Movie } from "src/modules/movies/entities/movie.entity";
import { CinemaHall } from "src/modules/cinema-hall/entities/cinema-hall.entity";

@Table({
    tableName: "session",
    timestamps: true
})
export class MovieSession extends Model<MovieSession, CreateMovieSessionDto> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    public session_id: string;

    @Column({
        type:DataType.DATE
    })
    start_time: Date;
    
    // ------------------------ CHAVES ESTRANGEIRAS ------------------
    
    @ForeignKey(() => Movie)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    movie_id: string;

    @BelongsTo(() => Movie)
    movie: Movie

    @ForeignKey(() => CinemaHall)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    cinemaHall_id: string;

    @BelongsTo(() => CinemaHall)
    cinemaHall: CinemaHall
}