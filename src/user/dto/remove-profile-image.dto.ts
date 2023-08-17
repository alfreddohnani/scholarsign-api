import { ID, InputType, ObjectType, Field } from '@nestjs/graphql';
import { IsDefined, IsUUID } from 'class-validator';

@InputType()
export class RemoveProfileImageRequestDto {
  /** ID of the user */
  @Field(() => ID, { description: 'ID of the user' })
  @IsDefined()
  @IsUUID('all')
  userId: string;
}

@ObjectType()
export class RemoveProfileImageResponseDto {
  /**ID of the user */
  @Field(() => ID, { description: 'ID of the user' })
  userId: string;
}
