import { Body, Controller, Delete, Get, Param, Post,Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskservice:TasksService){  }

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return  this.taskservice.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id:string): Promise<Task>{
    return   this.taskservice.getTaskById(Number(id));
  }

  @Post()
  async createTask(@Body('title') title:string,  @Body('description')  description: string):Promise<Task>{
    return  this.taskservice.createTask(title,description);
  }

  // @Put(':id')
  // async updateTask(@Param('id') id:number, @Body('completed') completed:boolean ):Promise<Task>{
  //   return  this.taskservice.updateTask(id,completed);
  // }
  @Put(':id') // БЫЛО @Put('id') (ошибка!)
  async updateTask(@Param('id') id: string, @Body('completed') completed: boolean): Promise<Task> {
    return this.taskservice.updateTask(Number(id), completed);
  }


  // @Delete(':id')
  // async deleteTask(@Param('id') id :number):Promise<void>{
  //   return  this.taskservice.deleteTask(id);
  // }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskservice.deleteTask(Number(id));
  }

}
