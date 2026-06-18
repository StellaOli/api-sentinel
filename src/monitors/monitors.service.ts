import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateMonitorDto } from './dto/create-monitor.dto';
import { MonitorCheckQueue } from 'src/monitor-checks/monitor-check.queue';

@Injectable()
export class MonitorsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly monitorCheckQueue: MonitorCheckQueue,
  ) {}

  async create(userId: string, dto: CreateMonitorDto) {
  console.log("🔥 ENTERED CREATE MONITOR");

  const monitor = await this.prisma.monitor.create({
    data: {
      ...dto,
      userId,
    },
  });

  console.log("🔥 MONITOR CREATED:", monitor.id);

  console.log("🔥 ABOUT TO CALL QUEUE");

  await this.monitorCheckQueue.scheduleMonitorCheck(monitor);

  console.log("🔥 QUEUE CALLED");

  return monitor;
}

  async findAll(userId: string) {
    return this.prisma.monitor.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getHistory(
  monitorId: string,
  userId: string,
) {
  return this.prisma.monitorCheck.findMany({
    where: {
      monitorId,
      monitor: {
        userId,
      },
    },
    orderBy: {
      checkedAt: 'desc',
    },
    take: 100,
  });
}

async getStats(
  monitorId: string,
  userId: string,
) {
  const checks =
    await this.prisma.monitorCheck.findMany({
      where: {
        monitorId,
        monitor: {
          userId,
        },
      },
    });

  const totalChecks = checks.length;

  const successfulChecks =
    checks.filter(
      c => c.isOnline,
    ).length;

  const failedChecks =
    totalChecks - successfulChecks;

  const uptime =
    totalChecks > 0
      ? Number(
          (
            (successfulChecks /
              totalChecks) *
            100
          ).toFixed(2),
        )
      : 0;

  const averageResponseTime =
    totalChecks > 0
      ? Math.round(
          checks.reduce(
            (acc, curr) =>
              acc +
              (curr.responseTime ?? 0),
            0,
          ) / totalChecks,
        )
      : 0;

  return {
    totalChecks,
    successfulChecks,
    failedChecks,
    uptime,
    averageResponseTime,
  };
}

async getDashboardStats(userId: string) {
  const monitors = await this.prisma.monitor.findMany({
    where: {
      userId,
    },
  });

  const totalMonitors = monitors.length;

  const onlineMonitors =
    monitors.filter(m => m.currentStatus).length;

  const offlineMonitors =
    totalMonitors - onlineMonitors;

  const checks =
    await this.prisma.monitorCheck.findMany({
      where: {
        monitor: {
          userId,
        },
      },
    });

  const averageResponseTime =
    checks.length > 0
      ? Math.round(
          checks.reduce(
            (sum, c) => sum + (c.responseTime ?? 0),
            0,
          ) / checks.length,
        )
      : 0;

  return {
    totalMonitors,
    onlineMonitors,
    offlineMonitors,
    averageResponseTime,
  };
}
}