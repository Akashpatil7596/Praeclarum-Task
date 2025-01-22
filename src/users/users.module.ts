import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/users';
import { AuthModule } from 'src/auth/auth.module';
import { EmailProviderModule } from 'src/email-provider/email-provider.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, EmailProviderModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
