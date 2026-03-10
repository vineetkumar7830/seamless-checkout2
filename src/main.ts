import * as dotenv from 'dotenv';
import { resolve, join } from 'path';

// Load .env before anything else
dotenv.config({ path: resolve(process.cwd(), '.env') });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 🔥 Production Safe Proxy Setting
  app.set('trust proxy', 1);

  // 🔥 Global API Prefix
  app.setGlobalPrefix('api');

  // ====================================================
  // 🔥 FIXED CORS CONFIG
  // ====================================================
  app.enableCors({
    origin: [
      'http://187.77.187.89',
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:5174',
      'http://localhost:8080',
    ],
    credentials: true,
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
  });

  // 🔥 GLOBAL VALIDATION
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        const firstError = errors[0];
        const message = firstError?.constraints
          ? Object.values(firstError.constraints)[0]
          : 'Validation failed';

        return new BadRequestException({
          statusCode: 400,
          message: message,
        });
      },
    }),
  );

  // 🔥 Static Folder
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  // 🔥 Swagger Config
  const config = new DocumentBuilder()
    .setTitle('Seamless Checkout API')
    .setDescription('Payment Link & Checkout System API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT || 9000;

  await app.listen(port);

  console.log(`🚀 Server running on http://187.77.187.89:${port}`);
}

bootstrap();