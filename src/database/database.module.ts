import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import * as dotenv from 'dotenv';
import { Users } from 'src/modules/users/entities/users.entity';
import { Movie } from '../modules/movies/entities/movie.entity';
import { CinemaHall } from 'src/modules/cinema-hall/entities/cinema-hall.entity';
import { MovieSession } from 'src/modules/session/entities/session.entity';
import { Seat } from 'src/modules/seats/entities/seat.entity';
import { Reservation } from 'src/modules/reservations/entities/reservation.entity';


dotenv.config();
@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: "postgres",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            models: [
                Users,
                Movie,
                CinemaHall,
                MovieSession,
                Seat,
                Reservation,
            ],
            synchronize: true,
            logging: true,
            autoLoadModels: true
        }),
    ],
    controllers: [],
    providers: [],
    exports: [SequelizeModule],
})

export class DatabaseModule {}