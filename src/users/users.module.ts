import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './users.model';
import { UsersController } from './users.controller';

@Module({
  imports: [SequelizeModule.forFeature([Users])],
  exports: [SequelizeModule, UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
