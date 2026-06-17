import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateMonitorDto } from './dto/create-monitor.dto';

@Injectable()
export class MonitorsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    userId: string,
    dto: CreateMonitorDto,
  ) {
    console.log('SERVICE USER ID:', userId);

    return this.prisma.monitor.create({
      data: {
        ...dto,
        userId,
      },
    });
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

}