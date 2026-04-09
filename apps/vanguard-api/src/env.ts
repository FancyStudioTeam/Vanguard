import { configDotenv } from 'dotenv';
import { getEnvVariable } from '#utils/Process/getEnvVariable.js';

const ENV_VALUE = getEnvVariable('NODE_ENV');
const ENV_FILE_PATH = `.env.${ENV_VALUE}`;

configDotenv({
	path: ENV_FILE_PATH,
	quiet: true,
});
