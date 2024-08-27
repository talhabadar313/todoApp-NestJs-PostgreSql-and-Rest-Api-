import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>, 
  ) {}

  async getAllTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async getTodoById(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async addTodo(todo: Todo): Promise<string> {
    await this.todoRepository.save(todo);
    return 'The todo has been added';
  }

  async updateTodo(todo: Todo): Promise<string> {
    const existingTodo = await this.todoRepository.findOne({ where: { id: todo.id } });
    if (!existingTodo) {
      throw new NotFoundException(`Todo with ID ${todo.id} not found`);
    }
    await this.todoRepository.update(todo.id, todo);
    return 'The todo has been updated';
  }

  async deleteTodo(id: number): Promise<string> {
    const result = await this.todoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return 'Todo has been deleted successfully';
  }
}
