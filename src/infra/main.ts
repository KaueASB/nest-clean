import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  })

  const config = new DocumentBuilder()
    .setTitle('Questions')
    .setDescription('The question API')
    .setVersion('1.0')
    .addTag('questions')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const envService = app.get(EnvService)
  const port = envService.get('PORT')

  await app.listen(port)
}

bootstrap()
