import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { IUser } from "../interfaces/IUser";

export class UserDTO implements IUser {
    id: number;
    
    @ApiProperty()
    @IsString()
    name: string;
    
    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    @MaxLength(24)
    password: string;
    
    @ApiProperty()
    @IsDateString()
    birthdate: Date;
    
    createdAt: Date;
    updatedAt: Date;
}