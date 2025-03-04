import {Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


@Injectable()
export class PrismaService extends PrismaClient  implements OnModuleInit ,OnModuleDestroy{
  update(arg0: { where: { id: number; }; data: { completed: boolean; }; }): Promise<import("../src/tasks/task.entity").Task> {
    throw new Error('Method not implemented.');
  }
  async onModuleInit() {
    await  this.$connect();    
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }


}