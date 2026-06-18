import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import axios from "axios";
import { PrismaService } from "../prisma/prisma.service";

@Processor("monitor-check")
export class MonitorCheckProcessor extends WorkerHost {
  constructor(private prisma: PrismaService) {
    super();
    console.log("🔥 WORKER INICIADO");
  }

  async process(job: Job<{ monitorId: string }>) {
    console.log('🔥 JOB RECEBIDO', job.data);
    const { monitorId } = job.data;

    const monitor = await this.prisma.monitor.findUnique({
      where: { id: monitorId },
    });

   if (!monitor) {
      throw new Error("Monitor not found");
    }
    const start = Date.now();

    try {
      const response = await axios.get(monitor.url, {
        timeout: 5000,
      });

      const responseTime = Date.now() - start;

      await this.prisma.monitorCheck.create({
        data: {
          monitorId,
          statusCode: response.status,
          responseTime,
          isOnline: response.status === monitor.expectedStatus,
          checkedAt: new Date(),
        },
      });

      await this.prisma.monitor.update({
        where: { id: monitorId },
        data: {
          currentStatus: response.status === monitor.expectedStatus,
          lastCheckedAt: new Date(),
        },
      });
    } catch (error: any) {
      const responseTime = Date.now() - start;

      await this.prisma.monitorCheck.create({
        data: {
          monitorId,
          statusCode: 0,
          responseTime,
          isOnline: false,
          errorMessage: error.message,
          checkedAt: new Date(),
        },
      });

      await this.prisma.monitor.update({
        where: { id: monitorId },
        data: {
          currentStatus: false,
          lastCheckedAt: new Date(),
        },
      });
    }
  }
}