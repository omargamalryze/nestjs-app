/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsBoolean, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsBoolean()
  readonly check: boolean;
}
