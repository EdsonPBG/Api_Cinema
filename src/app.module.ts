import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { MoviesModule } from './modules/movies/movies.module';
import { CinemaHallModule } from './modules/cinema-hall/cinema-hall.module';
import { SessionModule } from './modules/session/session.module';
import { SeatsModule } from './modules/seats/seats.module';
import { ReservationsModule } from './modules/reservations/reservations.module';


@Module({
  imports: [
    DatabaseModule, 
    AuthModule, 
    UsersModule, 
    MoviesModule, 
    CinemaHallModule, 
    SessionModule, 
    SeatsModule, 
    ReservationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
