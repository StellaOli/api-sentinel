import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { MonitorChecksService } from './monitor-checks.service';

@Module({
  imports: [PrismaModule],

  providers: [MonitorChecksService],
})
export class MonitorChecksModule {}