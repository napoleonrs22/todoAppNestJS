import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //await app.listen(process.env.PORT ?? 3000);

  const config  = new DocumentBuilder()
        .setTitle('todo Api')
        .setDescription('Api для управления задач')
        .setVersion('1.0')
        .addTag('tasks')
        .build();
  const document = SwaggerModule.createDocument(app,config);

  SwaggerModule.setup('api',app,document);

  await app.listen(3000);
}
bootstrap();
