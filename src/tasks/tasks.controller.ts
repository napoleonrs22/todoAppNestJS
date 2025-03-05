import { Body, Controller, Delete, Get, Param, Post,Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto, UpdateTaskDto } from './repository/dto/task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskservice:TasksService){  }

  @Get()
  @ApiOperation({summary:"Получить все задачи "})
  @ApiResponse({status:200,description:"Все задачи",type:[Task]})
  async getAllTasks(): Promise<Task[]> {
    return  this.taskservice.getAllTasks();
  }



  @Get(':id')
  @ApiOperation({summary:"Получить задачу по ID"})
  @ApiResponse({status:200,description:"Задача найдена",type:Task})
  async getTaskById(@Param('id') id:string): Promise<Task>{
    return   this.taskservice.getTaskById(Number(id));
  }

  @Post()
  @ApiOperation({summary:"Создать новую таблицу"})

  @ApiResponse({status:200,description:"Задача создана",type:Task})
  @ApiBody({
    schema:{
      type:'object',
      properties:{
        title:{type:'string',example:'новая задача'},
        description:{type:'string',example:'Описание задача'}
      },
    },
  })
  async createTask(@Body() createTaskDto:CreateTaskDto):Promise<Task>{
    return  this.taskservice.createTask(createTaskDto);
  }

  // @Put(':id')
  // async updateTask(@Param('id') id:number, @Body('completed') completed:boolean ):Promise<Task>{
  //   return  this.taskservice.updateTask(id,completed);
  // }

  @Put(':id')
  @ApiOperation({summary:"Обновить задачу"})
  @ApiResponse({status:200,description:"Задача обновлена",type:Task})
  @ApiResponse({status:404,description:'Задача не найден'})
  @ApiParam({name:'id',type:Number,description:"ID задачи"})
  @ApiBody({
    schema:{
      type:'object',
      properties:{
        completed:{type:'boolean',example:'true'},
      },
    },
  })
  async updateTask(@Param('id') id: string, @Body('completed') updateTaskDto:UpdateTaskDto): Promise<Task> {
    return this.taskservice.updateTask(Number(id), updateTaskDto);
  }


  // @Delete(':id')
  // async deleteTask(@Param('id') id :number):Promise<void>{
  //   return  this.taskservice.deleteTask(id);
  // }

  @Delete(':id')
  @ApiOperation({summary:"Удалить Задачу"})
  @ApiResponse({status:200,description:"Задача удален"})
  @ApiResponse({status:404,description:"Задача не найдена"})
  @ApiParam({name:'id',type:Number,description:"ID задачи"})

  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskservice.deleteTask(Number(id));
  }

}
