import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export abstract class SuperEntity extends BaseEntity {
  /**Primary auto-generated UUID of the entity */
  @Field(() => ID, { description: 'Primary auto-generated UUID of the entity' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**Date when the recorded was created */
  @Field(() => String, { description: 'Date when the recorded was created' })
  @CreateDateColumn()
  createdAt: string;

  /**Date when the record was last updated */
  @Field(() => String, {
    nullable: true,
    description: 'Date when the record was last updated ',
  })
  @UpdateDateColumn({ nullable: true })
  updatedAt?: string;
}
