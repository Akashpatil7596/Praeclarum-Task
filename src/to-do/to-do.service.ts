import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';
import { handleException } from 'src/helper/response';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDo } from 'src/models/to-do';
import { DeepPartial, Repository } from 'typeorm';
import { User } from 'src/models/users';
import { ToDoListDto } from './dto/to-do-list.dto';

@Injectable()
export class ToDoService {
  constructor(@InjectRepository(ToDo) private readonly toDoRepository: Repository<ToDo>) {}

  async createToDo(user: { id: number }, createToDoDto: CreateToDoDto) {
    try {
      const todoData: DeepPartial<ToDo> = {
        ...createToDoDto,
        status: false,
        user: { id: user.id } as User,
      };

      const newToDo = this.toDoRepository.create(todoData);

      const storeToDo = await this.toDoRepository.save(newToDo);

      if (storeToDo) {
        return storeToDo;
      } else {
        throw new HttpException('Error while creating', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      console.log('to-do.service.ts | createToDo | error', error);
      handleException(error);
    }
  }

  async getToDoById(id: number) {
    try {
      const toDo = await this.toDoRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!toDo || !toDo.id) {
        throw new HttpException('Todo does not exists', HttpStatus.NOT_FOUND);
      }

      return {
        message: 'Todo detail fetched successfully',
        data: toDo,
      };
    } catch (error) {
      console.log('to-do.service.ts | getToDoById | error', error);
      handleException(error);
    }
  }

  async getToDoList(query: ToDoListDto) {
    try {
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;

      const skip = (page - 1) * limit;

      const queryBuilder = this.toDoRepository.createQueryBuilder('toDo');

      queryBuilder.leftJoinAndSelect('toDo.user', 'user');
      if (query.status) {
        queryBuilder.andWhere('toDo.status = :status', { status: query.status });
      }

      if (query.search) {
        queryBuilder.andWhere('toDo.title LIKE :search', { search: `%${query.search}%` });
      }

      if (query.sortBy && query.sortOrder) {
        queryBuilder.orderBy(`toDo.${query.sortBy}`, query.sortOrder as 'ASC' | 'DESC');
      }

      if (query.status) {
        queryBuilder.andWhere('toDo.status = :status', { status: query.status });
      }

      const toDoList = await queryBuilder.skip(skip).take(limit).getMany();

      return {
        limit,
        page,
        totalCount: toDoList.length,
        data: toDoList,
      };
    } catch (error) {
      console.log('to-do.service.ts | getToDoList | error', error);
      handleException(error);
    }
  }

  async updateToDo(id: number, updateToDoDto: UpdateToDoDto) {
    try {
      const toDo = await this.toDoRepository.findOne({
        where: { id },
      });

      if (!toDo || !toDo.id) {
        throw new HttpException('Todo does not exists', HttpStatus.NOT_FOUND);
      }

      const updatedToDo = await this.toDoRepository.update(id, updateToDoDto);

      if (updatedToDo.affected && updatedToDo.affected > 0) {
        const toDo = await this.toDoRepository.findOne({
          where: { id },
          relations: ['user'],
        });

        return {
          message: 'Todo updated successfully',
          data: toDo,
        };
      } else {
        throw new HttpException('Error while updating', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      console.log('to-do.service.ts | getToDoList | error', error);
      handleException(error);
    }
  }

  async removeToDo(id: number) {
    try {
      const toDo = await this.toDoRepository.findOne({
        where: { id },
      });

      if (!toDo || !toDo.id) {
        throw new HttpException('Todo does not exists', HttpStatus.NOT_FOUND);
      }

      const deletedToDo = await this.toDoRepository.delete(id);

      if (deletedToDo.affected && deletedToDo.affected > 0) {
        return {
          message: 'Todo deleted successfully',
        };
      } else {
        throw new HttpException('Error while deleting', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      console.log('to-do.service.ts | removeToDo | error', error);
      handleException(error);
    }
  }
}
