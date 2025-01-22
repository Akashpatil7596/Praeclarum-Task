import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateToDoDto {
  @ApiProperty({
    example: 'Update title',
    required: false,
  })
  title?: string;

  @ApiProperty({
    example: 'Update description',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: true || false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
