import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import axios from 'axios';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MonitorChecksService {
  private readonly logger =
    new Logger(MonitorChecksService.name);

  constructor(
    private readonly prisma: PrismaService,
  ) {}

 @Cron('* * * * *')
 async executeChecks() {
  const monitors =
    await this.prisma.monitor.findMany();

  for (const monitor of monitors) {
    await this.checkMonitor(monitor);
  }
}

private async checkMonitor(
  monitor: any,
) {
  const startedAt = Date.now();

  try {
    const response = await axios.get(
      monitor.url,
      {
        timeout: 10000,
      },
    );

    const responseTime =
      Date.now() - startedAt;

    await this.prisma.monitorCheck.create({
      data: {
        monitorId: monitor.id,
        statusCode: response.status,
        responseTime,
        isOnline:
          response.status ===
          monitor.expectedStatus,
      },
    });

    await this.prisma.monitor.update({
      where: {
        id: monitor.id,
      },
      data: {
        currentStatus:
          response.status ===
          monitor.expectedStatus,

        lastCheckedAt: new Date(),
      },
    });

    this.logger.log(
      `${monitor.name} => ${response.status} (${responseTime}ms)`,
    );
  } catch (error) {
    const responseTime =
      Date.now() - startedAt;

    await this.prisma.monitorCheck.create({
      data: {
        monitorId: monitor.id,

        isOnline: false,

        responseTime,

        errorMessage:
          error.message,
      },
    });

    await this.prisma.monitor.update({
      where: {
        id: monitor.id,
      },
      data: {
        currentStatus: false,
        lastCheckedAt: new Date(),
      },
    });

    this.logger.error(
      `${monitor.name} OFFLINE`,
    );
  }
}


}