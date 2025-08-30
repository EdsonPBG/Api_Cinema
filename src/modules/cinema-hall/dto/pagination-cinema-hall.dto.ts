import { Type } from "class-transformer";
import { IsOptional, IsNumber, Min } from "class-validator";

export class CinemaHallPaginationDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    offset?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    limit?: number;
}