import { Table, Model, PrimaryKey, Default, DataType, Column } from "sequelize-typescript";
import { CreateMovieDto } from "../dto/create-movie.dto";

@Table({
    tableName: "movies",
    timestamps: true,
})
export class Movie extends Model<Movie, CreateMovieDto> {
   @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID) 
    public movie_id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    duration!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    genre!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    sinopse?: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    parentalRating!: string; 

    @Column({
        type: DataType.DATEONLY,
        allowNull: true,
    })
    releaseDate?: Date;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    poster?: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: true,
    })
    averageRating?: number;

    @Column({
        type: DataType.ARRAY(DataType.STRING),
        allowNull: true,
    })
    directors?: string[];

    @Column({
        type: DataType.ARRAY(DataType.STRING),
        allowNull: true,
    })
    cast?: string[];
}