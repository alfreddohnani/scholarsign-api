import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { SuperEntity } from 'src/common/entities/super.abstract.entity';
import { Column, Entity } from 'typeorm';

@ObjectType('Class')
@Entity({ name: 'classes' })
export class ClassEntity extends SuperEntity {
  /** Name of the class */
  @Field(() => String, { description: 'Name of the class' })
  @Column({ type: 'varchar' })
  name: string;

  /** The maximum size of the class" */
  @Field(() => Int, { description: 'The maximum size of the class' })
  @Column({ type: 'integer' })
  maxSize: number;

  /** ID of the representative of the class */
  @Field(() => ID, {
    nullable: true,
    description: 'ID of the representative of the class',
  })
  @Column({ type: 'uuid', nullable: true })
  representativeId?: string;
}
