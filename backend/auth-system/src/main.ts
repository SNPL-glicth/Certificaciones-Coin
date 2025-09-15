import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { CustomLoggerService } from './common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Obtener ConfigService
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  // Logger personalizado
  const logger = app.get(CustomLoggerService);
  app.useLogger(logger);

  // CORS
  const corsOrigins = configService.get<string>('CORS_ORIGIN')?.split(',') || ['*'];
  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
  });

  // Global pipes
  app.useGlobalPipes(new ValidationPipe());

  // Swagger Documentation
  if (configService.get<string>('NODE_ENV') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Auth System API')
      .setDescription('Sistema de autenticación escalable con NestJS')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('auth', 'Endpoints de autenticación')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  // Crear directorio de logs si no existe
  const fs = require('fs');
  if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
  }

  await app.listen(port);
  logger.log(`Aplicación iniciada en puerto ${port}`, 'Bootstrap');
  
  if (configService.get<string>('NODE_ENV') !== 'production') {
    logger.log(`Documentación disponible en: http://localhost:${port}/api/docs`, 'Bootstrap');
  }
}

bootstrap().catch((error) => {
  console.error('Error iniciando la aplicación:', error);
  process.exit(1);
});
