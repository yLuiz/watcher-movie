import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Query,
    UseGuards
} from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
import { Public } from "src/auth/public";
import { UserService } from "src/http/services/user/user.service";
import { UserDTO } from "src/shared/dto/User.dto";

@ApiBearerAuth()
@ApiTags("User")
@UseGuards(AuthGuard)
@Controller("user")
export class UserController {
  constructor(private _userService: UserService) {}

  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post()
  async createUser(@Body() user: UserDTO) {
    await this._userService.create(user);
    return;
  }

  @Get(":id")
  async getOneById(@Param("id") id: string) {
    try {
        const user = await this._userService.getOneById(+id);
        
        if (!user) {
            throw new NotFoundException(['Not found']);
        }
    } 
    catch (error) {
        throw new HttpException(error, error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiQuery({ name: "skip", required: false })
  @ApiQuery({ name: "take", required: false })
  async getAllUsers(
    @Query("skip") skip?: string,
    @Query("take") take?: string
  ) {
    try {
      const isTherePagination = skip !== undefined && take !== undefined;

      if (!isTherePagination) {
        return await this._userService.getAll();
      }

      return await this._userService.getAll({ skip: +skip, take: +take });
    } catch (error) {
        throw new HttpException(error, error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
