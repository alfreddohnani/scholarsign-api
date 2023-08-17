import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CourseEntity } from 'src/course/entities/course.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ChildEntity, Column, ManyToMany } from 'typeorm';

enum StudentResidency {
  ON_CAMPUS = 'ON_CAMPUS',
  OFF_CAMPUS = 'OFF_CAMPUS',
}
registerEnumType(StudentResidency, {
  name: 'StudentResidency',
});

enum StudentStatus {
  REGULAR = 'REGULAR',
  FOREIGN = 'FOREIGN',
  FEE_PAYING = 'FEE_PAYING',
  DISTANCE = 'DISTANCE',
}
registerEnumType(StudentStatus, {
  name: 'StudentStatus',
});

@ObjectType('Student')
@ChildEntity('student')
export class StudentEntity extends UserEntity {
  /** Date of birth of student */
  @Field(() => String, { description: 'Date of birth of student' })
  @Column({ type: 'date' })
  dateOfBirth: string;

  /** Gender of the student */
  @Field(() => String, { description: 'Gender of the student' })
  @Column({ type: 'char', length: 10 })
  gender: string;

  /** The residency of the student */
  @Field(() => StudentResidency, {
    description: 'The residency of the student',
  })
  @Column({ type: 'enum', enum: StudentResidency })
  residency: StudentResidency;

  /** The status of the student */
  @Field(() => StudentStatus, { description: 'The status of the student' })
  @Column({ type: 'enum', enum: 'The status of the student' })
  status: StudentStatus;

  @Field(() => [CourseEntity], {
    nullable: true,
    description: 'Courses this student is taking',
  })
  @ManyToMany(() => CourseEntity, (course) => course.students, {
    nullable: true,
  })
  courses?: CourseEntity[];
}

export { StudentResidency, StudentStatus };
