import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
import { MovieService } from "src/http/services/movie/movie.service";
import { MovieDTO } from "src/shared/dto/Movie.dto";

@ApiBearerAuth()
@ApiTags("Movies")
@UseGuards(AuthGuard)
@Controller("movie")
export class MovieController {
  constructor(private _movieService: MovieService) {}

  @Post()
  async create(@Body() movie: MovieDTO) {
    return await this._movieService.create(movie);
  }

  @Get(":id")
  async getOneById(@Param("id") id: string) {
    try {
      const movie = await this._movieService.getOneById(+id);

      if (!movie) {
        throw new NotFoundException(["Not Found"]);
      }

      return movie;

    } catch (error) {
      throw new HttpException(
        error,
        error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  @ApiQuery({ name: "skip", required: false })
  @ApiQuery({ name: "take", required: false })
  async getAllMovies(
    @Query("skip") skip?: string,
    @Query("take") take?: string
  ) {

    try {
      const isTherePagination = skip !== undefined && take !== undefined;

      if (!isTherePagination) {
        return await this._movieService.getAll();
      }

      return await this._movieService.getAll({ skip: +skip, take: +take });
    } catch (error) {
        throw new HttpException(error, error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(":id")
  async deleteOneById(@Param("id") id: string) {
    try {
      const movieExists = await this._movieService.getOneById(+id);

        if (!movieExists) {
          throw new NotFoundException(["Movie not found"]);
        }

      await this._movieService.deleteOneById(+id);

      return;

    } catch (error) {
      throw new HttpException(
        error,
        error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
