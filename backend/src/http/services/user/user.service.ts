import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UserRepository } from "src/db/repository/UserRepository";
import { IUser } from "src/shared/interfaces/IUser";
import { exclude } from "src/shared/utils/exclude-key";

@Injectable()
export class UserService {
  constructor(private _userRepository: UserRepository) {}

  async create(user: IUser) {

    const emailAlreadyExists = await this._userRepository.getOneByEmail(user.email);

    if (emailAlreadyExists) {
      throw new BadRequestException(['User already exists with this email.']);
    }

    const birthdateWithoutTime = String(user.birthdate).split("T")[0];

    const salt = 8;
    const hashedPassword = await bcrypt.hash(user.password, salt);

    user = {
      ...user,
      password: hashedPassword,
      birthdate: new Date(birthdateWithoutTime),
    };

    return await this._userRepository.create(user);
  }

  async getAll(params?: { skip?: number; take?: number }) {
    if (!params) {
      let usersData = await this._userRepository.getAll();

      const usersWithoutPassword = usersData.users.map((user) =>
        exclude(user, ["password"])
      );

      return {
        users: usersWithoutPassword,
        total: usersData.total
      };
    }

    let usersData = await this._userRepository.getAll({
      skip: +params.skip,
      take: +params.take,
    });
    const usersWithoutPassword = usersData.users.map((user) =>
      exclude(user, ["password"])
    );

    return {
      users: usersWithoutPassword,
      total: usersData.total
    };
  }

  async getOneById(id: number) {
    let user = await this._userRepository.getOneById(id);
    user = exclude(user, ["password"]);

    return user;
  }

  async getOneByEmail(email: string) {
    let user = await this._userRepository.getOneByEmail(email);
    user = exclude(user, ["password"]);

    return user;
  }
}
