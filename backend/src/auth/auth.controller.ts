import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthDTO } from "src/shared/dto/Auth.dto";
import { Public } from "./public";

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("auth")
  async signIn(@Body() signInDto: AuthDTO) {

   try {
    const isAuthenticated = await this.authService.signIn(signInDto.email, signInDto.password);

    if (!isAuthenticated) {
      throw new NotFoundException(['Not Found']);
    }

    return this.authService.signIn(signInDto.email, signInDto.password);
    
   } catch (error) {
    throw new HttpException(
      error,
      error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR
    );
   }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get("profile")
  async getProfile(@Request() req) {
    return req.user;
  }
}
