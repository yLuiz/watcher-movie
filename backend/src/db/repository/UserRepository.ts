import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { IUser, IUserResponse } from "src/shared/interfaces/IUser";
import { IUserRespository } from "src/shared/interfaces/IUserRepository";
import { exclude } from "src/shared/utils/exclude-key";

@Injectable()
export class UserRepository implements IUserRespository {

    constructor (
        @Inject('PRISMA_SERVICE')
        private _prisma: PrismaClient
    ) {}

    private _userModel = this._prisma.user;

    async create(user: IUser): Promise<void> {
        await this._userModel.create({
            data: user
        });

        return;
    }
    
    async getOneById(id: number): Promise<IUser> {
        const user = await this._userModel.findUnique({
            where: { id }
        });

        if (!user) return null;

        return user;
    }

    async getOneByEmail(email: string): Promise<IUser> {
        const user = await this._userModel.findFirst({
            where: { email }
        });

        if (!user) return null;        

        return user;
    }

    async getAll(params?: { skip?: number, take?: number }): Promise<{ users: IUser[], total: number}> {

        const lengthOfUsers = await this._userModel.count();

        if (!params || (params && params.skip === undefined || params.take === undefined)) {
            const users = await this._userModel.findMany();
            return {
                users,
                total: lengthOfUsers
            };
        }

        let { skip, take } = params;

        // skip = skip <= 0 ? 0 : skip;
        // let start = skip >= 1 ? (skip - 1) * take : skip;

        let start = skip <= 0 ? 0 : skip * take;
        start = start > lengthOfUsers ? start - lengthOfUsers : start;

        const usersWithRange = await this._userModel.findMany({
            skip: start,
            take,
        });        

        return {
            users: usersWithRange,
            total: lengthOfUsers
        };
    }
    
}