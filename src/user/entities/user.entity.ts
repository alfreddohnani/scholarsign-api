import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { SuperEntity } from 'src/common/entities/super.abstract.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  TableInheritance,
} from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';

enum UserType {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
}
registerEnumType(UserType, {
  name: 'UserType',
});

@ObjectType()
@Entity({ name: 'users' })
@TableInheritance({
  column: { type: 'varchar', name: 'type' },
})
export class UserEntity extends SuperEntity {
  /** First name of the user */
  @Field(() => String, { description: 'First name of the user' })
  @Column({ type: 'char', length: 50 })
  firstName: string;

  /** Last name of the user */
  @Field(() => String, { description: 'Last name of the user' })
  @Column({ type: 'char', length: 50 })
  lastName: string;

  /** Email address of the user */
  @Field(() => String, { description: 'Email address of the user' })
  @Column({ type: 'varchar', unique: true })
  email: string;

  /** Phone number of the user */
  @Field(() => String, {
    description: 'Phone number of the user',
  })
  @Column({ type: 'varchar', unique: true })
  phone: string;

  /** The user's password */
  @Field(() => String, { nullable: true, description: `The user's password` })
  @Column({ type: 'varchar', nullable: true })
  password?: string;

  /** User account authorization roles */
  @Field(() => [UserType], {
    nullable: 'items',
    description: 'User account authorization roles',
  })
  @Column({ type: 'simple-array', default: [] })
  roles: UserType[];

  /** URL of the profile image */
  @Field(() => String, {
    nullable: true,
    description: 'URL of the profile image',
  })
  @Column({ type: 'varchar', nullable: true })
  profileImage?: string;

  /** Storage key from the storage bucket */
  @Field(() => String, {
    nullable: true,
    description: 'Storage key from the storage bucket',
  })
  @Column({ type: 'varchar', nullable: true })
  profileImageKey?: string;

  /** Status of the user email verification */
  @Field(() => Boolean, {
    defaultValue: false,
    description: 'Status of the user email verification',
  })
  @Column({ type: 'boolean', default: false })
  hasVerifiedEmail: boolean;

  @BeforeUpdate()
  @BeforeInsert()
  private hashPassword(): void {
    if (this.password) {
      const salt = genSaltSync(10);
      const hash = hashSync(this.password, salt);
      this.password = hash;
    }
  }
}

export { UserType };
