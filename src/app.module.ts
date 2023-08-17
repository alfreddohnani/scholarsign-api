import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as Joi from 'joi';
import { join } from 'path';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { ClassModule } from './class/class.module';
import { FileStorageModule } from './file-storage/file-storage.module';
import { AuthModule } from './auth/auth.module';
import { S3Module } from './s3/s3.module';
import { UserModule } from './user/user.module';
import GraphQLJSON from 'graphql-type-json';

const isDev = process.env.NODE_ENV === 'development';
const productionCorsDomains = process.env.PRODUCTION_CORS_DOMAINS;
const productionCorsDomainsList = productionCorsDomains
  ? productionCorsDomains.split(',')
  : [];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .required()
          .valid('development', 'production', 'test', 'staging')
          .default('development'),
        PORT: Joi.number().required(),
        PRODUCTION_CORS_DOMAINS: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        SPACES_DEV_URL: Joi.string().required(),
        SPACES_DEV_FILE_UPLOADS_SECRET: Joi.string().required(),
        SPACES_DEV_FILE_UPLOADS_KEY: Joi.string().required(),
        SPACES_DEV_REGION: Joi.string().required(),
        SPACES_DEV_BUCKET: Joi.string().required(),
        SESSION_SECRET: Joi.string().required(),
        APP_DOMAIN: Joi.string().uri().required(),
      }),
    }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const isProduction =
          configService.getOrThrow<string>('NODE_ENV') === 'production';
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          debug: !isProduction,
          playground: !isProduction,
          introspection: !isProduction,
          cors: {
            origin: isDev
              ? [
                  'http://localhost:3006',
                  'http://localhost:3001',
                  'http://localhost:3000',
                ]
              : productionCorsDomainsList,
            credentials: true,
          },
          resolvers: { JSON: GraphQLJSON },
        };
      },
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV !== 'production',
        logging: process.env.NODE_ENV !== 'production',
        ssl:
          configService.get<string>('DB_SSL_MODE') === 'true'
            ? {
                ca: configService.get<string>('DB_SSL'),
                rejectUnauthorized: false,
              }
            : false,
      }),
    }),

    StudentModule,

    CourseModule,

    ClassModule,

    FileStorageModule,

    AuthModule,

    S3Module,

    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
