import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateMovieSessionDto {
    @IsDateString()
    @IsNotEmpty()
    start_time: Date;

    @IsString()
    movie_id: string;

    @IsString()
    cinemaHall_id: string;
}