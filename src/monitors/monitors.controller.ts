import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CurrentUser } from '../auth/decorators/current-user.decorator';

import { CreateMonitorDto } from './dto/create-monitor.dto';

import { MonitorsService } from './monitors.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('monitors')
@ApiBearerAuth('access-token')
@Controller('monitors')
@UseGuards(JwtAuthGuard)
export class MonitorsController {
  constructor(
    private readonly monitorsService: MonitorsService,
  ) {}

  @Post()
  create(
    @CurrentUser() user: any,
    @Body() dto: CreateMonitorDto,
  ) {
    console.log('CREATE MONITOR');
    console.log('USER:', user);
    console.log('DTO:', dto);

    return this.monitorsService.create(
      user.id,
      dto,
    );
  }

  @Get()
  findAll(
    @CurrentUser() user: any,
  ) {
    return this.monitorsService.findAll(
      user.id,
    );
  }
}