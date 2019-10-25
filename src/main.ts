import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CustomLogger } from './shared/logger/logger.service';
import * as compression from 'compression';
import { ValidationCustomPipe } from './shared/pipes/validation-custom.pipe';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new CustomLogger() });
  app.use(compression());

  // Open API
  const options = new DocumentBuilder()
    .setTitle('Gidu API')
    .setDescription('API - Gestão de Igrejas Digitais Unificada')
    .setVersion('1.0.1')
    .addTag('Users', 'Cadastro de usuários')
    .addTag('Accounts', 'Controle de acesso')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);

  app.enableCors();
  app.useGlobalPipes(new ValidationCustomPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
