import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsDefined, IsEmail, IsPhoneNumber } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

@InputType()
export class GetUserByEmailRequestDto {
  @Field(() => String)
  @IsDefined()
  @IsEmail()
  email: string;
}

@InputType()
export class GetUserByPhoneRequestDto {
  @Field(() => String)
  @IsPhoneNumber()
  phone: string;
}

@ObjectType()
export class GetUserResponseDto {
  @Field(() => UserEntity, { nullable: true })
  user: UserEntity | null;
}
