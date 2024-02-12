import { IMovie } from "./IMovie";
import { IUser } from "./IUser";

export type UserFilter = Omit<IUser, 'id' | 'password' | 'birthdate' | 'updatedAt' | 'createdAt'>
export type MovieFilter = Omit<IMovie, 'id' | 'updatedAt' | 'createdAt'>
