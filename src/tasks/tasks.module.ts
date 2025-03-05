import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from 'prisma/prisma.service';
import { TaskRepository } from './repository/repositories';

@Module({
  controllers: [TasksController],
  providers: [TasksService,PrismaService,TaskRepository]
})
export class TasksModule {}
