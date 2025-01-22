import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ToDoListDto {
  @ApiProperty({
    example: 10,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  limit: string;

  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  page: string;

  @ApiProperty({
    example: 'title',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    example: 'createdAt',
    required: false,
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiProperty({
    example: 'ASC |  DESC',
    required: false,
  })
  @IsOptional()
  @IsString()
  sortOrder?: string;

  @ApiProperty({
    example: true,
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string;
}
