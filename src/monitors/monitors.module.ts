import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MonitorChecksModule } from "../monitor-checks/monitor-checks.module";
import { MonitorsController } from './monitors.controller';
import { MonitorsService } from './monitors.service';


@Module({
  imports: [PrismaModule, MonitorChecksModule],

  controllers: [MonitorsController],

  providers: [MonitorsService],
})
export class MonitorsModule {}