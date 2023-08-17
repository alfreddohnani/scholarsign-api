import {
  ValidationPipe,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { urlencoded, json } from 'express';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const isDev = configService.get<string>('NODE_ENV') === 'development';

  const productionCorsDomains = configService.get<string>(
    'PRODUCTION_CORS_DOMAINS',
  );
  const productionCorsDomainsList = productionCorsDomains
    ? productionCorsDomains.split(',')
    : [];

  app.enableCors({
    origin: isDev
      ? [
          'http://localhost:3006',
          'http://localhost:3001',
          'http://localhost:3000',
        ]
      : productionCorsDomainsList,
    credentials: true,
  });

  if (isDev) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('SCHOLAR SIGN API')
      .setVersion('1.0.0')
      .addTag('ScholarSign API')
      .addBearerAuth()
      .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, swaggerDocument);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        console.log('validationErrors', validationErrors);
        return new BadRequestException(validationErrors);
      },
      skipMissingProperties: true,
    }),
  );
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use(
    session({
      secret: configService.get<string>('SESSION_SECRET'),
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
        secure: configService.get<string>('NODE_ENV') === 'production',
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const PORT = configService.get('PORT');
  await app.listen(PORT);
}
bootstrap();
