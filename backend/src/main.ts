import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";


async function main() {
const app = await NestFactory.create(AppModule);
const PORT = process.env.PORT ?? 3000;

const config = new DocumentBuilder()
    .setTitle('TZ')
    .setDescription('TZ API')
    .setVersion('1.0.0')
    .addTag('tz')
    .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('/api/docs', app, document);


await app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}
main();
