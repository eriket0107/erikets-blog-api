import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';
import { env } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Eriket's Blog")
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(env.PORT, () => {
    console.log(
      `🚀 Server running on port: ${env.PORT}. ✅ \n🚀 Server running on env: ${env.NODE_ENV}. ✅`,
    );
  });
}
void bootstrap();
