import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class ResetForgottenPasswordRequestDto {
  /**The email of the user */
  @Field(() => String, { description: 'The email of the user' })
  @IsDefined()
  @IsEmail()
  email: string;

  /** The token sent in the reset forgotten password email */
  @Field(() => String, {
    description: 'The token sent in the reset forgotten password email',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  token: string;

  /** The new password */
  @Field(() => String, { description: 'The new password' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}

@ObjectType()
export class ResetForgottenPasswordResponseDto {
  /**The id of the user */
  @Field(() => ID, { description: 'The id of the user' })
  userId: string;
}
