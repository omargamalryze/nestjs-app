import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todos } from './todos.model';

@Module({
  controllers: [TodosController],
  imports: [SequelizeModule.forFeature([Todos])],
  providers: [TodosService],
})
export class TodosModule {}
