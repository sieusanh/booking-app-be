import { registerAs, ConfigModule } from '@nestjs/config'

export const databaseConfig = registerAs('database', async () => {
    /* 
        This construction guarantees that after the ConfigModule.envVariablesLoaded Promise resolves, 
        all configuration variables are loaded up.
    */

    await ConfigModule.envVariablesLoaded;

    return {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT!) || 5432
    }
});
