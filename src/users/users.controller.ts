import { Controller, Get, Param, Post, Query, Res, StreamableFile } from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { ParseMongoIdPipe } from "../common/pipes/parse-mongo-id/parse-mongo-id.pipe.js";
import { Auth } from "../auth/decorators/auth.decorator.js";
import { UserRole } from "./schemas/user.schema.js";
import { UserResponseDto } from "./dto/user-response.dto.js";
import { PaginationDTO } from "../common/dto/pagination.dto.js";


@Controller("users")
export class UsersController {

    public constructor(
        private readonly usersService: UsersService
    ) { }

    @Get()
    public async findAll(
        @Query() pagination: PaginationDTO,
    ) {
        return this.usersService.findAll(pagination);
    }

    @Get("arrivals")
    @Auth(UserRole.ADMIN)
    public async findArrivals(
        @Query() pagination: PaginationDTO,
    ) {
        return this.usersService.findArrivals(pagination);
    }

    @Get(":id")
    public async findOneById(
        @Param("id", ParseMongoIdPipe) id: string
    ) {
        const user = await this.usersService.findOneById(id);

        return UserResponseDto.fromDocument(user);
    }

}