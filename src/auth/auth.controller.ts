import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthInput, AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';
import { IRequestWithPayload } from 'src/interfaces/request.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login(@Body() authInput: AuthInput) {
    return this.authService.authenticate(authInput);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getUserInfo(@Request() request: IRequestWithPayload) {
    return request.payload;
  }
}
