import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, ParseIntPipe, Query, Put } from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ToDoListDto } from './dto/to-do-list.dto';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('to-do')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  @Post()
  async create(@Req() req, @Body() createToDoDto: CreateToDoDto) {
    return await this.toDoService.createToDo(req.user, createToDoDto);
  }

  @Get()
  async getToDoList(@Query() query: ToDoListDto) {
    return await this.toDoService.getToDoList(query);
  }

  @Get(':id')
  async getToDoById(@Param('id', ParseIntPipe) id: number) {
    return await this.toDoService.getToDoById(id);
  }

  @Put(':id')
  async updateToDo(@Param('id', ParseIntPipe) id: number, @Body() updateToDoDto: UpdateToDoDto) {
    return await this.toDoService.updateToDo(id, updateToDoDto);
  }

  @Delete(':id')
  async removeToDo(@Param('id', ParseIntPipe) id: number) {
    return await this.toDoService.removeToDo(id);
  }
}
