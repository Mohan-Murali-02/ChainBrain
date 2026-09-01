import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const server = app.getHttpAdapter().getInstance();

  server.post('/raw-test', (req, res) => {
    console.log('Content-Type:', req.headers['content-type']);
    console.log('req.file =', req.file);
    console.log('req.body =', req.body);

    res.json({ ok: true });
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();