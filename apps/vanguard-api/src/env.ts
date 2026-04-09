import { loadEnvFile } from 'node:process';
import { getEnvFileName } from '#utils/Process/getEnvFileName.js';

const envFileName = getEnvFileName();

loadEnvFile(envFileName);
