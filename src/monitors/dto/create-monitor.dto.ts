import {
  IsInt,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateMonitorDto {
  @IsString()
  name: string;

  @IsUrl()
  url: string;

  @IsInt()
  @Min(10)
  interval: number;

  @IsInt()
  expectedStatus?: number = 200;
}