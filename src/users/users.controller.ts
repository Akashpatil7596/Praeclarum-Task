import { Controller, Post, Body, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerificationDto } from './dto/verification.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterDto) {
    return await this.usersService.register(registerUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginDto) {
    return this.usersService.login(loginUserDto);
  }

  @Put('verification')
  async verifyUser(@Body() verificationDto: VerificationDto) {
    return this.usersService.verifyUser(verificationDto);
  }
}
