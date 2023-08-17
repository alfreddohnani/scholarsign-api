import { Field, InputType } from '@nestjs/graphql';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserRequestDto {
  /**First name of the user */
  @Field(() => String, { description: `First name of the user` })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  /**Last name of the user */
  @Field(() => String, { description: 'Last name of the user' })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  /**Email of the user */
  @Field(() => String, { description: 'Email of user' })
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**Phone number of the user */
  @Field(() => String, { description: 'Phone number of the user' })
  @IsDefined()
  @IsNotEmpty()
  phone: string;

  /**Password provided by the user. The minimum length of the password should be 6 characters */
  @Field(() => String, {
    description:
      'Password provided by the user. The minimum length of the password should be 6 characters',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
