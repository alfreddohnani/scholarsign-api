import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import * as multerS3 from 'multer-s3';
import { S3Module } from '../s3/s3.module';
import { S3Service } from '../s3/s3.service';
import { FileStorageService } from './file-storage.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule, S3Module],
      inject: [ConfigService, S3Service],
      useFactory: (configService: ConfigService, s3Service: S3Service) => {
        return {
          storage: multerS3({
            s3: s3Service.getS3Client(),
            bucket: configService.get<string>('SPACES_DEV_BUCKET'),
            key: (req, file, cb) => {
              const uniqueSuffix =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
              cb(null, file.fieldname + '-' + uniqueSuffix);
            },
            contentType: multerS3.AUTO_CONTENT_TYPE,
            acl: 'public-read',
          }),
        };
      },
    }),
  ],
  providers: [S3Service, FileStorageService],
  exports: [S3Service, MulterModule, FileStorageService],
})
export class FileStorageModule {}
