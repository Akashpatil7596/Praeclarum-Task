import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerificationDto {
  @ApiProperty({
    example: '1234',
    required: true,
  })
  @IsNotEmpty()
  otp: number;

  @ApiProperty({
    example: 'john.doe@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
