import { Module } from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { ToDoController } from './to-do.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDo } from 'src/models/to-do';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ToDo]), AuthModule],
  controllers: [ToDoController],
  providers: [ToDoService],
})
export class ToDoModule {}
