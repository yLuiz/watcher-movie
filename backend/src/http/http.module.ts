import { Module } from '@nestjs/common';
import { MovieController } from './controllers/movie/movie.controller';
import { UserController } from './controllers/user/user.controller';
import { MovieService } from './services/movie/movie.service';
import { UserService } from './services/user/user.service';
import { DbModule } from 'src/db/db.module';

@Module({
    imports: [DbModule],
    controllers: [UserController, MovieController],
    providers: [MovieService, UserService],
    exports: [MovieService, UserService]
})
export class HttpModule {}
