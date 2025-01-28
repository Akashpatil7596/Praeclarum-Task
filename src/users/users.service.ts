import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/users';
import { Repository } from 'typeorm';
import { handleException } from 'src/helper/response';
import { compareNumber, comparePassword, generateRandomNumber } from 'src/helper/commonFunctions';
import { AuthService } from 'src/auth/auth.service';
import { EmailProviderService } from 'src/email-provider/email-provider.service';
import { VerificationDto } from './dto/verification.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
    private readonly emailProviderService: EmailProviderService,
  ) {}

  async register(registerUserDto: RegisterDto) {
    try {
      const isUserExist = await this.userRepository.findOne({
        where: { email: registerUserDto.email },
      });

      if (isUserExist && isUserExist?.id) {
        throw new HttpException('User already exists', HttpStatus.NOT_FOUND);
      }

      registerUserDto['otp'] = generateRandomNumber(1000, 9999);

      this.emailProviderService.sendMail({
        to: registerUserDto.email,
        from: process.env.EMAIL_PROVIDER_USER || 'dummyforaltair@gmail.com',
        subject: 'OTP Verification',
        template: 'verification-mail',
        context: {
          otp: registerUserDto['otp'],
        },
      });

      const newUser = this.userRepository.create(registerUserDto);

      const storeUser = await this.userRepository.save(newUser);

      return {
        message: 'User created successfully',
        data: {
          id: storeUser.id,
          name: storeUser.name,
          email: storeUser.email,
          password: storeUser.password,
          createdAt: storeUser.createdAt,
          updatedAt: storeUser.updatedAt,
        },
      };
    } catch (error) {
      console.log('users.service.ts | register | error | line:59', error);
      handleException(error);
    }
  }

  async login(loginUserDto: LoginDto) {
    try {
      const isUserExist = await this.userRepository.findOne({
        where: { email: loginUserDto.email },
      });

      if (!isUserExist || !isUserExist?.id) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (isUserExist.verified === false) {
        throw new HttpException('Verify user first!', HttpStatus.UNAUTHORIZED);
      }

      const isPasswordMatch = await comparePassword(loginUserDto.password, isUserExist.password);

      if (!isPasswordMatch) {
        throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
      }

      const token = this.authService.generateToken({
        id: isUserExist.id,
        email: isUserExist.email,
      });

      return {
        message: 'User logged in successfully',
        data: {
          ...isUserExist,
          token,
        },
      };
    } catch (error) {
      console.log('users.service.ts | login | error | line:97', error);
      handleException(error);
    }
  }

  async verifyUser(verificationDto: VerificationDto) {
    try {
      const isUserExist = await this.userRepository.findOne({
        where: { email: verificationDto.email },
      });

      if (!isUserExist || !isUserExist?.id) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      console.log('verificationDto.otp, isUserExist.otp', typeof verificationDto.otp, typeof Number(isUserExist.otp));

      const isOtpMatch = compareNumber(verificationDto.otp, Number(isUserExist.otp));

      if (!isOtpMatch) {
        throw new HttpException('Invalid OTP', HttpStatus.UNAUTHORIZED);
      }

      await this.userRepository.update(isUserExist.id, { otp: 0, verified: true });

      return { message: 'User verified successfully' };
    } catch (error) {
      console.log('users.service.ts | verifyUser | error | line:123', error);
      handleException(error);
    }
  }
  s;
}
