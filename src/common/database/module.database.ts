import { Module, Global, Inject } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { databaseConfig } from 'src/config';

class DatabaseAccess {
    constructor() { }

    connect() { }

    disconnect() { }
}

interface DatabaseConfig {
    host: string;
    port: number;
}

interface EnvironmentVariables {
    PORT: number;
    TIMEOUT: string;
}

@Module({
    // imports: [ConfigModule]

    imports: [ConfigModule.forFeature(databaseConfig)]
})
export class DatabaseModule {
    // constructor(private configService: ConfigService) {
    //     // get an environment variable
    //     const dbUser = this.configService.get<string>('DATABASE_USER');

    //     // get a custom configuration value
    //     const dbHost = this.configService.get<string>('database.host');

    //     const dbConfig = this.configService.get<DatabaseConfig>('database');

    //     // you can now use `dbConfig.port` and `dbConfig.host`
    //     const host = dbConfig.host;
    //     const port = dbConfig.port;

    //     // The get() method also takes an optional second argument defining a default value, which will be returned when the key doesn't exist, as shown below:
    //     const dbLocalhost = this.configService.get<string>('database.host', 'localhost');
    // }

    /*
        With the infer property set to true, the ConfigService#get method will automatically infer the property type based on the interface, so for example, typeof port === "number" (if you're not using strictNullChecks flag from TypeScript) since PORT has a number type in the EnvironmentVariables interface.

        Also, with the infer feature, you can infer the type of a nested custom configuration object's property, even when using dot notation
    */

    // constructor(private configService: ConfigService<EnvironmentVariables>) {
    //     const port = this.configService.get('PORT', { infer: true });
    // }

    // constructor(private configService: ConfigService<{ database: { host: string }}>) {
    //     const dbHost = this.configService.get('database.host', { infer: true })!;
    // }

    /*
        The second generic relies on the first one, acting as a type assertion to get rid of all undefined types that ConfigService's methods can return when strictNullChecks is on.:
    */

    // constructor(private configService: ConfigService<{ PORT: number }, true>) {
    //     const port = this.configService.get('PORT', { infer: true });
    // }

    // constructor(private configService: ConfigService) {
    //     const dbHost = this.configService.get<string>('database.host');
    // }

    /*
        A reasonable alternative is to inject the database namespace directly. This allows us to benefit from strong typing.
    */
    constructor(
        @Inject(databaseConfig.KEY)
        private dbConfig: ConfigType<typeof databaseConfig>,
    ) { }
}
