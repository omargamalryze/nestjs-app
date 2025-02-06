import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'tamm_db', //schema
      autoLoadModels: true,
      // synchronize: true, //force schema changes
    }),
    TodosModule,
  ],
  providers: [],
})
export class AppModule {}
