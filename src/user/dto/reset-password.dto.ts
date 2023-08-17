import { Field, InputType, ID, ObjectType } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class ResetPasswordRequestDto {
  /**The current password */
  @Field(() => String, { description: 'The current password' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  /**The new password */
  @Field(() => String, { description: 'The new password' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}

@ObjectType()
export class ResetPasswordResponseDto {
  /**The id of the user */
  @Field(() => ID, { description: 'The id of the user' })
  userId: string;
}
