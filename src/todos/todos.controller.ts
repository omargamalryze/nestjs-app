import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { IRequestWithPayload } from '../interfaces/request.interface';

@Controller('todos')
@UseGuards(AuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(
    @Body() createTodoDto: CreateTodoDto,
    @Request() req: IRequestWithPayload,
  ) {
    const { userId } = req.payload;
    return this.todosService.create(createTodoDto, userId);
  }

  @Get()
  findAll(@Request() req: IRequestWithPayload) {
    const { userId } = req.payload;
    return this.todosService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: IRequestWithPayload) {
    const userId = req.payload.userId;
    return this.todosService.findOne(+id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Request() req: IRequestWithPayload,
  ) {
    const { userId } = req.payload;
    return this.todosService.update(+id, userId, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: IRequestWithPayload) {
    const { userId } = req.payload;
    return this.todosService.remove(+id, userId);
  }
}
