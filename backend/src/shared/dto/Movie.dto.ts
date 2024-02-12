import { ApiProperty } from "@nestjs/swagger";
import { IMovie } from "../interfaces/IMovie";
import { IsDateString, IsNumber, IsString, Max } from "class-validator";

export class MovieDTO implements IMovie {
    id: number;
    
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNumber()
    duration: number;

    @ApiProperty()
    @IsDateString()
    year: Date;

    @ApiProperty()
    @Max(18)
    rating: number;

    createdAt: Date;
    updatedAt: Date;
    
}