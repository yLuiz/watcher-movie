import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true
  });

  app.useGlobalPipes(new ValidationPipe());

  if (process.env.IS_DEVELOPMENT) {
    const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Watcher Movies')
    .setDescription('Management of Movies and Users')
    .setVersion('1.0')
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(3005);
}
bootstrap();
