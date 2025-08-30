import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const config = new DocumentBuilder()
    .setTitle("Cinema-api")
    .setDescription("API documentation for developers and Integrations")
    .addBearerAuth()
    .build();

    export function swaggerStart (app: INestApplication) {
        const document = SwaggerModule.createDocument(app, config);

        SwaggerModule.setup('api/docs', app, document)
    }