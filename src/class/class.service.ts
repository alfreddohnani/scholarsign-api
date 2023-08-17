import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from './entities/class.entity';
import { Repository } from 'typeorm';
import {
  CreateClassRequestDto,
  CreateClassResponseDto,
} from './dto/create-class.dto';
import {
  UpdateClassRequestDto,
  UpdateClassResponseDto,
} from './dto/update-class.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(ClassEntity)
    private readonly classRepository: Repository<ClassEntity>,
  ) {}

  public async createClass(
    data: CreateClassRequestDto,
  ): Promise<CreateClassResponseDto> {
    try {
      const { name } = data;

      const existingClass = await this.classRepository.findOne({
        where: {
          name,
        },
      });
      if (existingClass) {
        throw new ForbiddenException('A class wuth this name already exists');
      }

      const newClass = this.classRepository.create(data);
      const savedClass = await this.classRepository.save(newClass);
      return {
        class: savedClass,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async updateClass(
    id: string,
    data: UpdateClassRequestDto,
  ): Promise<UpdateClassResponseDto> {
    try {
      const classExists = await this.classRepository.findOne({
        where: {
          id,
        },
      });
      if (!classExists) throw new NotFoundException('Class not found');

      await this.classRepository.update(id, {
        ...data,
      });

      return {
        classId: id,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
