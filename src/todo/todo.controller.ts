import { Controller, Delete, Get, Param, Post, Put, Body, ParseIntPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('/')
  async getAllTodos(): Promise<Todo[]> {
    return this.todoService.getAllTodos();
  }

  @Get('/:id')
  async getTodoById(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todoService.getTodoById(id);
  }

  @Post('/add')
  async addTodo(@Body() todo: Todo): Promise<string> {
    return this.todoService.addTodo(todo);
  }

  @Put('/update')
  async updateTodo(@Body() todo: Todo): Promise<string> {
    return this.todoService.updateTodo(todo);
  }

  @Delete('/delete/:id')
  async deleteTodo(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.todoService.deleteTodo(id);
  }
}
