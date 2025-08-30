import { IsArray, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateReservationDto {
    @IsUUID()
    @IsNotEmpty()
    user_id: string;
    
    @IsUUID()
    @IsNotEmpty()
    session_id: string;
    
    @IsArray()
    @IsUUID('all', { each: true })
    @IsNotEmpty()
    seat_ids: string[];
}
