import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { User } from 'src/models/users';

export class CreateToDoDto {
  @ApiProperty({
    example: 'This is a title',
    required: true,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe laboriosam ducimus illo. Assumenda accusamus error tempore blanditiis natus voluptatem dicta aliquid ipsum laudantium totam. Sint est maxime magni aspernatur beatae.',
    required: true,
  })
  @IsNotEmpty()
  description: string;

  status?: boolean;

  user?: number | User;
}
