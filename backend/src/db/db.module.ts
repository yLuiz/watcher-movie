import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repository/UserRepository';
import { MovieRepository } from './repository/MovieRepository';

@Module({
    providers: [
        UserRepository, 
        MovieRepository, 
        {
            provide: 'PRISMA_SERVICE',
            useClass: PrismaService,
        }
    ],
    exports: [UserRepository, MovieRepository]
})
export class DbModule { }
