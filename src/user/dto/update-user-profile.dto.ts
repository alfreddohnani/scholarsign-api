import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

@InputType()
export class UpdateUserProfileData implements Partial<UserEntity> {
  /**First name of the student */
  @Field(() => String, {
    nullable: true,
    description: 'First name of the student',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  /**Last name of the student */
  @Field(() => String, {
    nullable: true,
    description: 'Last name of the student',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  /**Phone number of the student */
  @Field(() => String, {
    nullable: true,
    description: 'Phone number of the student',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone?: string;
}
