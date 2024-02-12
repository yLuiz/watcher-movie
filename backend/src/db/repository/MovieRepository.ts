import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { MovieDTO } from "src/shared/dto/Movie.dto";
import { IMovie } from "src/shared/interfaces/IMovie";
import { IMovieRespository } from "src/shared/interfaces/IMovieRepository";

@Injectable()
export class MovieRepository implements IMovieRespository {

    constructor (
        @Inject('PRISMA_SERVICE')
        private _prisma: PrismaClient
    ) {}
    

    private _movieModel = this._prisma.movie;

    async create(movie: MovieDTO): Promise<void> {
        await this._movieModel.create({
            data: movie
        });

        return;
    }

    async getOneById(id: number): Promise<IMovie> {
        return await this._movieModel.findFirst({
            where: { id },
        })
    }

    async getAll(params?: { skip?: number, take?: number }): Promise<{movies: IMovie[], total: number}> {
        const lengthOfMovies = await this._movieModel.count();

        if (!params || (params && params.skip === undefined || params.take === undefined)) {
            const movies = await this._movieModel.findMany();
            return {
                movies,
                total: lengthOfMovies
            };
        }
        
        let { skip, take } = params;

        // skip = skip <= 0 ? 0 : skip;
        // let start = skip >= 1 ? (skip - 1) * take : skip;

        let start = skip <= 0 ? 0 : skip * take;
        start = start > lengthOfMovies ? start - lengthOfMovies : start;

        const movies = await this._movieModel.findMany({
            skip: start,
            take,
        });

        return {
            movies,
            total: lengthOfMovies
        };
        
    }

    async deleteOneById(id: number): Promise<void> {
        await this._movieModel.delete({ 
            where: {
                id
            }
        });

        return;

    }
}