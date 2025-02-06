import { Injectable } from '@nestjs/common';
import { Users } from './users.model';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  readonly salt = 10; //should be in dotenv
  readonly pepper = 'secret_pepper'; //should be in dotenv
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const password = await bcrypt.hash(
      this.pepper + createUserDto.password,
      this.salt,
    );
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
    const password = await bcrypt.hash(
      this.pepper + updateUserDto.password,
      this.salt,
    );
    const user = await this.userModel.update(
      { ...updateUserDto, password },
      {
        where: {
          id: id,
        },
        returning: true,
      },
    );
    return user;
  }
  async findOne(id: number) {
    const user = await this.userModel.findByPk(id);
    return user;
  }
}
