import { Prisma } from "@prisma/client";

type MoviePrisma = Prisma.MovieGetPayload<{ select: { [K in keyof Required<Prisma.MovieSelect>]: true } }>;

export interface IMovie extends MoviePrisma {}