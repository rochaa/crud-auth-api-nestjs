import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Open API
  const options = new DocumentBuilder()
    .setTitle('Gidu API')
    .setDescription('API - Gestão de Igrejas Digitais Unificada')
    .setVersion('1.0.1')
    .addTag('gidu')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
