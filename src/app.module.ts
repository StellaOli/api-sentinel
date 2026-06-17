import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MonitorsModule } from './monitors/monitors.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MonitorChecksModule } from './monitor-checks/monitor-checks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,
    UsersModule,
    AuthModule,
    MonitorsModule,
    ScheduleModule.forRoot(),
    MonitorChecksModule,
  ],
  controllers: [AppController],
})
export class AppModule {}