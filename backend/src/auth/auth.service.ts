import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/http/services/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/db/repository/UserRepository';

@Injectable()
export class AuthService {
    constructor(
        private _jwtService: JwtService,
        private _userRepository: UserRepository,
      ) {}
    
      async signIn(
        email: string,
        password: string,
      ): Promise<{ access_token: string } | null> {
        const user = await this._userRepository.getOneByEmail(email);

        if (!user) return null;

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        
        if (!isCorrectPassword) {
          throw new UnauthorizedException();
        }

        const payload = { sub: user.id, email: user.email, name: user.name };
        
        return {
          access_token: await this._jwtService.signAsync(payload),
        };
      }
}
