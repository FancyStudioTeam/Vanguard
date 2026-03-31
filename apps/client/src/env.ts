import { loadEnvFile } from 'node:process';
import { getEnvFileName } from './utils/getEnvFileName.js';

const envFileName = getEnvFileName();

loadEnvFile(envFileName);
