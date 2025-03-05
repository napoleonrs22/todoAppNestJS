import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TasksService {

  
  constructor(private readonly prisma: PrismaService) {

  }


  async getAllTasks(): Promise<Task[]>{
    return this.prisma.task.findMany();
  }


  async getTaskById(id: number): Promise<Task> {

    const task = await this.prisma.task.findUnique({
      where: { id: Number(id) }
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return task;
  }


  async createTask(title :string,description:string) :Promise<Task>{
    return this.prisma.task.create({

      data: {
        title,
        description,
        completed: false,
      },
    });

  }

  async updateTask(id: number, completed: boolean): Promise<Task> {

    const  task = await this.getTaskById(id);

    return this.prisma.task.update({
      where: { id },
      data: { completed },
    });
  }



  async deleteTask(id: number): Promise<void> {

    await this.getTaskById(id);
    await this.prisma.task.delete({ where: { id } });



  }


}
