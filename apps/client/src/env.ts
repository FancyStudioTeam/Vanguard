import { loadEnvFile } from 'node:process';
import { getEnvFileName } from './utils/getEnvFileName.js';

loadEnvFile(getEnvFileName());
