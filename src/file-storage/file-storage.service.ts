import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileStorageService {
  private s3Client: S3Client;
  private Bucket: string;

  constructor(
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {
    this.s3Client = s3Service.getS3Client();
    this.Bucket = configService.get<string>('SPACES_DEV_BUCKET');
  }

  public async deleteFile(Key: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.Bucket,
      Key,
    });

    return this.s3Client.send(command);
  }

  public async deleteFiles(Keys: string[]) {
    const command = new DeleteObjectsCommand({
      Bucket: this.Bucket,
      Delete: {
        Objects: Keys.map((Key) => ({
          Key,
        })),
      },
    });
    return this.s3Client.send(command);
  }
}
