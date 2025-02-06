import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

export type AuthInput = { username: string; password: string };
export type Payload = { username: string; userId: number };
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async authenticate(input: AuthInput) {
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return this.generateAccessToken(user);
  }
  async validateUser(input: AuthInput) {
    const user = await this.usersService.findByName(input.username);
    if (user && (await this.comparePassword(input.password, user.password))) {
      return {
        userId: user.id,
        username: user.username,
      };
    }
    return null;
  }
  async comparePassword(
    inputPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const pepper = 'secret_pepper'; //should be in dotenv
    const isValid = await bcrypt.compare(
      pepper + inputPassword,
      hashedPassword,
    );
    return isValid;
  }
  async generateAccessToken(payload: Payload) {
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken, ...payload };
  }
}
