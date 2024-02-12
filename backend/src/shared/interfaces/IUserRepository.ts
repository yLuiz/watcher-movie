import { IUser, IUserResponse } from "./IUser";

export interface IUserRespository {
    create(user: IUser): Promise<void>;
    getOneById(id: number): Promise<IUserResponse>;
    getOneByEmail(email: string): Promise<IUserResponse>;
    getAll(params: { skip: number, take: number }): Promise<{users: IUserResponse[], total: number}>;
}