import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import {
  IsArray,
  IsDefined,
  IsIn,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { getEnumKeys } from '../utils';
import { Type } from 'class-transformer';
import {
  TOrderDirection,
  LogicalOperator,
  ConditionalOperator,
  Filter,
  OrderBy,
  FilterMember,
} from 'typeorm-advanced-filter-util';

registerEnumType(ConditionalOperator, {
  name: 'ConditionalOperator',
});
registerEnumType(LogicalOperator, {
  name: 'LogicalOperator',
});

@InputType()
export class FilterMemberDto implements FilterMember {
  /** The database columns to filter by */
  @Field(() => [String], { description: 'The database columns to filter by' })
  @IsDefined()
  @IsArray()
  fields: string[];

  /**Value to filter by for each field directly proportional to the position of the field in the list */
  @Field(() => [String], {
    description:
      'Value to filter by for each field directly proportional to the position of the field in the list',
  })
  @IsDefined()
  @IsArray()
  values: string[];

  /**Database operator to filter by for each field directly proportional to the position of the field in the list */
  @Field(() => [ConditionalOperator], {
    description:
      'Database operator to filter by for each field directly proportional to the position of the field in the list',
  })
  @IsDefined()
  @IsArray()
  operators: ConditionalOperator[];
}

@InputType()
export class FilterDto implements Filter {
  /**Logical and/or to filter records by */
  @Field(() => LogicalOperator, {
    description: 'Logical and/or to filter records by',
  })
  @IsDefined()
  @IsString()
  @IsIn(getEnumKeys(LogicalOperator))
  logicalOperator: LogicalOperator;

  /**A list of filter members consisting of fields, operators and values */
  @Field(() => [
    FilterMemberDto,
    {
      description:
        'A list of filter members consisting of fields, operators and values',
    },
  ])
  @IsDefined()
  @IsArray()
  filters: FilterMemberDto[];
}

@InputType()
export class OrderByDto implements OrderBy {
  /** Database columns to order records by */
  @Field(() => [String], {
    description: 'Database columns to order records by',
  })
  @IsDefined()
  @IsArray()
  fields: string[];

  /**Value to order records by for each field directly proportional to the position of the field in the list */
  @Field(() => [String], {
    description:
      'Value to order records by for each field directly proportional to the position of the field in the list',
  })
  @IsDefined()
  @IsArray()
  values: TOrderDirection[];
}

@InputType()
export class FindOptionsDto {
  /**Filter object. See how to use it in this example: https://github.com/alfreddohnani/typeorm-advanced-filter-util#solution */
  @Field(() => FilterDto, {
    nullable: true,
    description:
      'Filter object. See how to use it in this example: https://github.com/alfreddohnani/typeorm-advanced-filter-util#solution',
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FilterDto)
  where?: Filter;

  /**Order object */
  @Field(() => OrderByDto, { nullable: true, description: 'Order object' })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OrderByDto)
  order?: OrderByDto;
}

export { ConditionalOperator, LogicalOperator };
