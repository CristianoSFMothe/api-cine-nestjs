import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
<<<<<<< HEAD

=======
  
>>>>>>> parent of b0d161d (feat: refatoracao total do projeto)
  const config = new DocumentBuilder()
    .setTitle('NestJs API')
    .setDescription('The description of the API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
<<<<<<< HEAD

=======
>>>>>>> parent of b0d161d (feat: refatoracao total do projeto)
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
