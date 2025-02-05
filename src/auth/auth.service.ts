import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

export type AuthInput = { username: string; password: string };
export type Payload = { username: string; userId: number };
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  authenticate(input: AuthInput) {
    const user = this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.generateAccessToken(user);
  }
  validateUser(input: AuthInput) {
    const user = this.usersService.findUserByName(input.username);
    if (user && user.password == input.password) {
      return {
        userId: user.userId,
        username: user.username,
      };
    }
    return null;
  }
  async generateAccessToken(payload: Payload) {
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken, ...payload };
  }
}
