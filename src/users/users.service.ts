import { Injectable } from '@nestjs/common';
import { Users } from './users.model';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const salt = 10; //should be in dotenv
    const pepper = 'secret_pepper'; //should be in dotenv
    const password = await bcrypt.hash(pepper + createUserDto.password, salt);
    const user = await this.userModel.create({
      username: createUserDto.username,
      password,
    });
    return user;
  }
  async findAll() {
    const users = await this.userModel.findAll();
    return users;
  }
  async findByName(username: string) {
    const user = await this.userModel.findOne({ where: { username } });
    return user;
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
