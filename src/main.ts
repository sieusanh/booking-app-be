import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from 'src/modules';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { LoggerMiddleware } from './common/middlewares';
// import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from 'src/common';
import { ConfigService } from '@nestjs/config';
import { AccountDto } from 'modules/hr';
import { QueryParams } from 'common/http';
import { AllExceptionsFilter } from 'common/exception';
import * as cors from 'cors';
import helmet from 'helmet';
import fs from 'fs';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // app.useGlobalGuards(new TestGuard());

    // Here are for functional-based LoggerMiddleware
    app.use(cors())
    app.use(helmet())
    app.use(LoggerMiddleware);
    app.setGlobalPrefix('api');

    const swaggerConfig = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('Demo NestJS')
        .setDescription('The APIs description')
        .setVersion('1.0')
        // .addTag('demo')
        .build();

    const swaggerOptions: SwaggerDocumentOptions = {
        extraModels: [QueryParams, AccountDto]
    }
    const document = SwaggerModule.createDocument(
        app, swaggerConfig, swaggerOptions);
    
    // fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
    
    
    SwaggerModule.setup('api-docs', app, document, {
        swaggerOptions: {   
            docExpansion: 'none'
        }
    });


    // app.use(() => {
    //   throw new NotFoundException('Route not found.');
    // });

    app.useGlobalPipes(
        new ValidationPipe({
            disableErrorMessages: true,
            whitelist: true,
            transform: true
        })
    );

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    process.on('unhandledRejection', (error, promise) => {
        throw error;
    });

    process.on('uncaughtException', async (error) => {
        const defaultMessage = 'Server failed.';
        if (error instanceof Error) {
            console.error(error?.message || defaultMessage);
        } else if (typeof error === 'string') {
            console.error(error || defaultMessage);
        }

        // process.exit(1);
    });

    // app.use(cookieParser());

    const configService = app.get(ConfigService);   
    const appConfig = configService.get('app');
    const appPort = appConfig?.port;

    await app.listen(appPort).catch(err => {
        console.log('Server Error: ', err);
    });
}

bootstrap();
