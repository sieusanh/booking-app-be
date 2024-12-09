
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import 'dotenv/config';

// const YAML_CONFIG_FILENAME = `config.${process.env.env}.yaml`;
const YAML_CONFIG_FILENAME = `../../config.${process.env.env}.yaml`;
export function configuration() {
    return yaml.load(
        readFileSync(
            join(__dirname, YAML_CONFIG_FILENAME), 
            'utf8'
        ),
    ) as Record<string, any>;
};

// join(__dirname, `../config/${process.env.env}.yaml`)

