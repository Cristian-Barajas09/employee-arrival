import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDTO {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    public limit = 10;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    public offset = 0;
}