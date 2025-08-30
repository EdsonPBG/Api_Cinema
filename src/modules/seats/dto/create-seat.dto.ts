import { IsNotEmpty, IsString } from "class-validator";
import { Default } from "sequelize-typescript";

export class CreateSeatDto {
    @IsString()
    @IsNotEmpty()
    seat_number: string;

    @IsString()
    status: string;

    @IsString()
    session_id: string;
}
