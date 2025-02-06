import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Todos } from './todos.model';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todos) private todosModel: typeof Todos) {}
  async create(createTodoDto: CreateTodoDto, userId: number) {
    return await this.todosModel.create({ ...createTodoDto, userId });
  }

  async findAll(userId: number) {
    return await this.todosModel.findAll({ where: { userId } });
  }

  async findOne(id: number, userId: number) {
    const todo = await this.todosModel.findOne({
      where: {
        id,
        userId,
      },
    });
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  async update(id: number, userId: number, updateTodoDto: UpdateTodoDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_affectedRows, numberOfAffected] = await this.todosModel.update(
      updateTodoDto,
      {
        where: {
          id,
          userId, //-> users shouldn't update other people notes
        },
        returning: true,
      },
    );
    if (!numberOfAffected) {
      throw new NotFoundException();
    }
    return 'Todo was updated!';
  }

  async remove(id: number, userId: number) {
    const todo = await this.todosModel.findOne({
      where: {
        id,
        userId,
      },
    });
    if (!todo) {
      throw new NotFoundException();
    }
    await todo.destroy();
  }
}
