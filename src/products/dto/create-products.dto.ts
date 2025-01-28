import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { User } from 'src/models/users';

export class CreateProductDto {
  @ApiProperty({
    example: 'Product Name',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 4000,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe laboriosam ducimus illo. Assumenda accusamus error tempore blanditiis natus voluptatem dicta aliquid ipsum laudantium totam. Sint est maxime magni aspernatur beatae.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 2,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  user?: number | User;
}
