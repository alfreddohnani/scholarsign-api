import { S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      endpoint: configService.get<string>('SPACES_DEV_URL'),
      region: configService.get<string>('SPACES_DEV_REGION'),
      credentials: {
        accessKeyId: configService.get<string>('SPACES_DEV_FILE_UPLOADS_KEY'),
        secretAccessKey: configService.get<string>(
          'SPACES_DEV_FILE_UPLOADS_SECRET',
        ),
      },
    });
  }

  getS3Client() {
    return this.s3Client;
  }
}
