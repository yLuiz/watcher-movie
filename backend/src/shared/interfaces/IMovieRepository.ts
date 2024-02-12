import { MovieDTO } from "../dto/Movie.dto";
import { IMovie } from "./IMovie";

export interface IMovieRespository {
    create(user: MovieDTO): Promise<void>;
    getOneById(id: number): Promise<IMovie>;
    getAll(params?: { skip?: number, take?: number }): Promise<{movies: IMovie[], total: number}>;
    deleteOneById(id: number): Promise<void>;
}