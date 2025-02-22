import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
    preflightContinue: false,
  });

  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('NestJS')
    .setDescription('My IQud Tek Project With Postgres')
    .setVersion('1.0')
    .addServer('http://localhost:8080/', 'Local environment')
    .addServer('http://65.2.63.196:8080/', 'Staging')
    .addTag('IQud Tek APIs')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
