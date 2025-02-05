import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Todos } from './todos.model';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todos) private todosModel: typeof Todos) {}
  async create(createTodoDto: CreateTodoDto) {
    return await this.todosModel.create({ ...createTodoDto });
  }

  async findAll() {
    return await this.todosModel.findAll();
  }

  async findOne(id: number) {
    return await this.todosModel.findOne({
      where: {
        id,
        //userId
      },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    try {
      return await this.todosModel.update(updateTodoDto, {
        where: {
          id,
          //userId -> users shouldn't update other people notes
        },
        returning: true,
      });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  async remove(id: number) {
    try {
      const todo = await this.todosModel.findByPk(id);
      await todo?.destroy();
    } catch (err) {
      console.log(err);
    }
  }
}
