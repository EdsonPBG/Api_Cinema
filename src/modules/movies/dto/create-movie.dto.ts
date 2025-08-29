import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    duration!: string;

    @IsString()
    @IsNotEmpty()
    genre!: string;

    @IsString()
    @IsOptional()
    sinopse?: string;

    @IsString()
    @IsNotEmpty()
    parentalRating!: string;

    @IsDateString()
    @IsOptional()
    releaseDate?: Date;

    @IsString()
    @IsOptional()
    poster?: string;

    @IsNumber()
    @IsOptional()
    averageRating?: number;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    directors?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    cast?: string[];
}