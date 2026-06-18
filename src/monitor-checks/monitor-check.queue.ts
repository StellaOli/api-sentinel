import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";

@Injectable()
export class MonitorCheckQueue {
  constructor(
    @InjectQueue("monitor-check") private queue: Queue,
  ) {}

  async scheduleMonitorCheck(monitor: any) {
    await this.queue.add(
      "check-monitor",
      {
        monitorId: monitor.id,
      },
      {
        repeat: {
          every: monitor.interval * 1000, // intervalo individual
        },
        jobId: `monitor-${monitor.id}`, // 🔥 evita duplicação
        removeOnComplete: true,
        removeOnFail: false,
      },
    );
  }
}