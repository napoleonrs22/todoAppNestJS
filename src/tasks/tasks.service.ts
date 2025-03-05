import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { TaskRepository } from './repository/repositories';
import { PrismaClient } from '@prisma/client';
import { CreateTaskDto, UpdateTaskDto } from './repository/dto/task.dto';

@Injectable()
export class TasksService {

  
  constructor(private readonly taskRepository: TaskRepository) {

  }


  async getAllTasks(): Promise<Task[]>{
    return this.taskRepository.findAll();
  }


  async getTaskById(id: number): Promise<Task> {
    let task: Task | null;
    try {
      task = await this.taskRepository.findById(id);
    } catch (error) {
      throw new Error(`Failed to fetch task with ID ${id}: ${error.message}`);
    }
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }

    return task;

    // const task = await this.taskRepository.findById({
    //   where: { id: Number(id) }
    // });

    // if (!task) {
    //   throw new NotFoundException(`Task with ID ${id} not found.`);
    // }
    // return task;
  }


  async createTask(data:CreateTaskDto) :Promise<Task>{
    console.log("try", data)
    return this.taskRepository.create(data.description, data.title);

  }

  async updateTask(id:number,updateTaskDto:UpdateTaskDto): Promise<Task> {
    const  task = await this.getTaskById(id);
    return this.taskRepository.update(id,updateTaskDto.completed);
  }



  async deleteTask(id: number): Promise<void> {

    await this.getTaskById(id);
    await this.taskRepository.delete(id);
  }


}
