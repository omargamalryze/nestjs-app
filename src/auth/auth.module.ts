import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'fake-secret', //replace with dotenv
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
