import { Body, Controller, Delete, Get, Param, Post,Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskservice:TasksService){  }

  @Get()
  getAllTasks():Task[]{
    return this.taskservice.getAllTasks();
  }

  @Get(':id')
  getTaskByID(@Param('id') id:number):Task{
    return this.taskservice.getTaskById(id);
  }

  @Post()
  createTask(@Body('title') title:string,  @Body('description')  description: string):Task{
    return this.taskservice.createTask(title,description);
  }

  @Put('id')
  updateTask(@Param('id') id:number, @Body('completed') completed:boolean ):Task{
    return this.taskservice.updateTask(id,completed);
  }


  @Delete(':id')
  deleteTask(@Param('id') id :number):void{
    return this.taskservice.deleteTask(id);
  }

}
