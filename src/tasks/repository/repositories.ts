
import { PrismaClient, Task } from "@prisma/client";

import { Injectable } from '@nestjs/common';
import { PrismaService } from "prisma/prisma.service";


@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async findById(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id: Number(id) },
    });
  }

  async create(title: string, description: string): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title:title,
        description:description,
        completed: false,
      },
    });
  }

  async update(id: number, completed: boolean): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: { completed },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.task.delete({ where: { id } });
  }
}