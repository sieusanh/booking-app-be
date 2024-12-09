import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
    Provision = 'provision'
}

class EnvironmentVariables {

    NODE_ENV: Environment;

    // 0 - 65535
    PORT: number;
}

export function validate(config: Record<string, unknown>) {
// export function validate(config: any) {
    const validateConfig = plainToInstance(
        EnvironmentVariables,
        config,
        { enableImplicitConversion: true },
    );
    const errors = validateSync(validateConfig, { skipMissingProperties: false });
    // console.log('============= errors ', errors[0])
    // if (errors?.length > 0) {
    //     const errVal = errors[0]?.value || '';
    //     throw new Error(errVal);
    // }
    // return validateConfig;
    return errors;
}
