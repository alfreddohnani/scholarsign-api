import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';

export class UpdateProfileImageRequestDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: `The new profile image of the user. Allowed file types: 'image/jpeg', 'image/jpg', 'image/png'`,
  })
  profileImage: Express.MulterS3.File;
}

export class UpdateProfileImageResponseDto {
  imageUrl: string;
}
