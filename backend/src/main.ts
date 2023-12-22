import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function start() {
  const PORT = 5000;
  const app = await NestFactory.create(AppModule);

  
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

await app.listen(PORT,() => console.log(`Server is running on ${PORT}`));

};
start();
