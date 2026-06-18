import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BullModule } from "@nestjs/bullmq";
import { MonitorCheckProcessor } from "./monitor-check.processor";
import { MonitorCheckQueue } from "./monitor-check.queue";

@Module({
  imports: [PrismaModule, BullModule.registerQueue({ name: "monitor-check" })],
  
  providers: [MonitorCheckProcessor, MonitorCheckQueue],
  exports: [MonitorCheckQueue],
})
export class MonitorChecksModule {}