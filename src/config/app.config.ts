import { registerAs, ConfigModule } from '@nestjs/config'

export const appConfig = registerAs('app', async () => {

    await ConfigModule.envVariablesLoaded;

    return {
        host: process.env.APP_HOST || 'localhost',
        port: parseInt(process.env.APP_PORT!, 10) || 3000
    }
});
