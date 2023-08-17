import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { ClassEntity } from '../entities/class.entity';

@InputType()
export class CreateClassRequestDto {
  /** Name of the class */
  @Field(() => String, { description: 'Name of the class' })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  /** The maximum size of the class" */
  @Field(() => Int, { description: 'The maximum size of the class' })
  @IsDefined()
  @IsNumber()
  @IsPositive()
  @Min(10)
  maxSize: number;

  /** ID of the representative of the class */
  @Field(() => ID, {
    nullable: true,
    description: 'ID of the representative of the class',
  })
  @IsOptional()
  representativeId?: string;
}

@ObjectType()
export class CreateClassResponseDto {
  /** The created course */
  @Field(() => ClassEntity, {
    nullable: true,
    description: 'The created course',
  })
  class: ClassEntity;
}
