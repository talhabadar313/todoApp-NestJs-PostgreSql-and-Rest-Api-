import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/entities/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'talha123',
      username: 'postgres',
      entities: [Todo],
      database: 'tododatabase',
      synchronize: true,
      logging: true,
    }),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}