import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    example: 'Product Name',
    required: true,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    example: 4000,
    required: true,
  })
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe laboriosam ducimus illo. Assumenda accusamus error tempore blanditiis natus voluptatem dicta aliquid ipsum laudantium totam. Sint est maxime magni aspernatur beatae.',
    required: true,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    example: 2,
    required: true,
  })
  @IsNumber()
  @IsOptional()
  quantity: number;
}
