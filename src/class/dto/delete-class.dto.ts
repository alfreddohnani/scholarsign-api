import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class DeleteClassRequestDto {
  @Field(() => ID)
  id: string;
}

@ObjectType()
export class DeleteClassResponsetDto {
  @Field(() => ID, { nullable: true })
  id: string;
}
