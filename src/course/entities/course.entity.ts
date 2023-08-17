import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SuperEntity } from 'src/common/entities/super.abstract.entity';
import { StudentEntity } from 'src/student/entities/student.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@ObjectType('Course')
@Entity({ name: 'courses' })
export class CourseEntity extends SuperEntity {
  /** Name of the course */
  @Field(() => String, { description: 'Name of the course' })
  @Column({ type: 'varchar' })
  name: string;

  /** When the course starts */
  @Field(() => String, { description: 'When the course starts' })
  @Column({ type: 'date' })
  startDate: string;

  /** Duration of the course */
  @Field(() => Int, { description: 'Duration of the course' })
  @Column({ type: 'integer' })
  duration: number;

  /** Students who are taking this course */
  @Field(() => [StudentEntity], {
    nullable: 'itemsAndList',
    description: 'Students who are taking this course',
  })
  @ManyToMany(() => StudentEntity, (student) => student.courses, {
    nullable: true,
  })
  @JoinTable()
  students?: StudentEntity[];
}
