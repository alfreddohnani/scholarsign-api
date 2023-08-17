import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

@InputType()
export class UpdateClassRequestDto {
  /** Name of the class */
  @Field(() => String, { nullable: true, description: 'Name of the class' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  /** The maximum size of the class" */
  @Field(() => Int, {
    nullable: true,
    description: 'The maximum size of the class',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(10)
  maxSize?: number;

  /** ID of the representative of the class */
  @Field(() => ID, {
    nullable: true,
    description: 'ID of the representative of the class',
  })
  @IsOptional()
  representativeId?: string;
}

@ObjectType()
export class UpdateClassResponseDto {
  @Field(() => ID, { nullable: true, description: 'The id of the class' })
  classId: string;
}
