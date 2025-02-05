import { Injectable } from '@nestjs/common';
import { Users } from './users.model';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create({
      username: createUserDto.username,
      password: createUserDto.password,
    });
    return user;
  }
  async findAll() {
    const users = await this.userModel.findAll();
    return users;
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.update(updateUserDto, {
      where: {
        id: id,
      },
      returning: true,
    });
    return user;
  }
  async findOne(id: number) {
    const user = await this.userModel.findByPk(id);
    return user;
  }
}
