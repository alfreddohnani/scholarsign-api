import { InputType, Field, ObjectType, ID } from '@nestjs/graphql';
import { IsDefined, IsEmail } from 'class-validator';

@InputType()
export class SendResetForgottenPasswordEmailRequestDto {
  /**The email of the user */
  @Field(() => String, { description: 'The email of the user' })
  @IsDefined()
  @IsEmail()
  email: string;
}

@ObjectType()
export class SendResetForgottenPasswordEmailResponseDto {
  /** The id of the user */
  @Field(() => ID, { description: 'The id of the user' })
  userId: string;
}
