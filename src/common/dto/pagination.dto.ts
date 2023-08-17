import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsDefined } from 'class-validator';
import {
  IPaginationMeta,
  IPaginationLinks,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Type } from '@nestjs/common';

@ObjectType()
export class PaginationMeta implements IPaginationMeta {
  @Field(() => Int)
  itemCount: number;

  @Field(() => Int, { nullable: true })
  totalItems?: number;

  @Field(() => Int)
  itemsPerPage: number;

  @Field(() => Int, { nullable: true })
  totalPages?: number;

  @Field(() => Int)
  currentPage: number;
}

export function PaginateResult<T>(ItemType: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PageClass {
    @Field(() => [ItemType], {
      nullable: 'items',
    })
    items: T[];

    @Field(() => PaginationMeta)
    meta: PaginationMeta;
  }

  return PageClass;
}

@ObjectType()
export class PaginationLinks implements IPaginationLinks {
  @Field(() => String, { nullable: true })
  first?: string;

  @Field(() => String, { nullable: true })
  previous?: string;

  @Field(() => String, { nullable: true })
  next?: string;

  @Field(() => String, { nullable: true })
  last?: string;
}

@InputType()
export class PaginationOptionsDto implements IPaginationOptions {
  /**Current page number */
  @IsNotEmpty()
  @IsDefined()
  @Field(() => Int, { description: 'Current page number' })
  page: string | number;

  /**Number of records to fetch per page */
  @IsNotEmpty()
  @IsDefined()
  @Field(() => Int, { description: 'Number of records to fetch per page' })
  limit: string | number;
}
