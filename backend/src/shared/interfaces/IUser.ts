import { Prisma } from "@prisma/client";

type UserPrisma = Prisma.UserGetPayload<{ select: { [K in keyof Required<Prisma.UserSelect>]: true } }>;

export interface IUser extends UserPrisma {};

export interface IUserResponse extends Omit<IUser, 'password'> {};