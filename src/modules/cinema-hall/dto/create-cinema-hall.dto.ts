import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCinemaHallDto {
    @IsNumber()
    @IsNotEmpty()
    room_number: number;

    @IsNumber()
    @IsNotEmpty()
    seat_capacity: number;

    @IsString()
    @IsNotEmpty()
    hall_type: string;

    @IsBoolean()
    @IsOptional()
    active?: boolean
}