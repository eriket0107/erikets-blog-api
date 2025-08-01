import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { env } from './env';
import { WinstonLogger } from './logger/winston.logger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new WinstonLogger(),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("Eriket's Blog")
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);
  app.enableCors({
    origin: [env.FRONTEND_URL],
  });
  await app.listen(env.PORT, () => {
    console.log(
      `🚀 Server running on port: ${env.PORT}. ✅ \n🚀 Server running on env: ${env.NODE_ENV}. ✅`,
    );
  });
}
void bootstrap();
