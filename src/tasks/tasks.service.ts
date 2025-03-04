import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

  private tasks: Task[] =[];

  private nextId = 1;

  getAllTasks():Task[]{
    return this.tasks;
  }


  getTaskById(id: number): Task {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new Error(`Task with ID ${id} not found.`);
    }
    return task;
  }
  // getTaskById(id : number) :Task{
  //   return this.tasks.find(task => task.id === id);
  // }

  createTask(title :string,description:string) :Task{
    const task:Task={
      id: this.nextId++,
      title,
      description,
      completed:false,
    };
    this.tasks.push(task);
    return task
  }

  updateTask(id:number,completed:boolean):Task{
    const task =this.getTaskById(id);

    if(task){
      task.completed = completed
    }
    return task;
  }


  deleteTask(id: number): void {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(({ id: taskId }) => taskId !== id);

    if (this.tasks.length === initialLength) {
      console.warn(`Task with ID ${id} not found.`);
    }
  }

  // deleteTask(id:number) :void{
  //   return 
  // }
}
