import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsDefined, IsEmail, IsString } from 'class-validator';

@InputType()
export class VerifyUserEmailRequestDto {
  @Field(() => String)
  @IsDefined()
  @IsString()
  token: string;

  @Field(() => String)
  @IsDefined()
  @IsEmail()
  email: string;
}

@ObjectType()
export class VerifyUserEmailResponseDto {
  @Field(() => ID)
  userId: string;
}
