import { Injectable } from "@nestjs/common";
import { log } from "console";
import { MovieRepository } from "src/db/repository/MovieRepository";
import { IMovie } from "src/shared/interfaces/IMovie";

@Injectable()
export class MovieService {
  constructor(private _movieRepository: MovieRepository) {}

  async create(movie: IMovie) {
    await this._movieRepository.create(movie);

    return;
  }

  async getOneById(id: number) {
    const movie = await this._movieRepository.getOneById(id);
    return movie;
  }

  async getAll(params?: { skip?: number; take?: number }) {
    if (!params) {
      return await this._movieRepository.getAll();
    }

    return await this._movieRepository.getAll({
      skip: +params.skip,
      take: +params.take,
    });
  }

  async deleteOneById(id: number) {
    
    await this._movieRepository.deleteOneById(id);
    
    return;
  }
}
