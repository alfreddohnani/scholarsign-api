import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassResolver } from './class.resolver';
import { ClassController } from './class.controller';

@Module({
  providers: [ClassService, ClassResolver],
  controllers: [ClassController]
})
export class ClassModule {}
