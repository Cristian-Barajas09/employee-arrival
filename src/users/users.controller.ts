import { Controller, Get, Param, Post, Res, StreamableFile } from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { ParseMongoIdPipe } from "../common/pipes/parse-mongo-id/parse-mongo-id.pipe.js";


@Controller("users")
export class UsersController {

    public constructor(
        private readonly usersService: UsersService
    ) { }

    @Get()
    public async findAll() {
        return this.usersService.findAll();
    }

    @Get(":id")
    public async findOneById(
        @Param("id", ParseMongoIdPipe) id: string
    ) {
        return this.usersService.findOneById(id);
    }

}