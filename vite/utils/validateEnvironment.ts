import fs from 'node:fs';
import path from 'node:path';

interface Params {
    envDirName: string;
    mode: string;
}

/**
 * Validates presence of environment directory and file.
 *
 * @param {Object} params - Function parameters
 * @param {string} params.envDirName - Name of env directory
 * @param {string} params.mode - Environment mode
 *
 * @throws {Error} When specified directory or file not found
 */
const validateEnvironment = ({ envDirName, mode }: Params): void => {
    const pathToEnvDir = path.join(process.cwd(), envDirName);
    if (!fs.existsSync(pathToEnvDir)) {
        throw new Error(`Env directory ${envDirName} not found`);
    }

    const fileName = `.env.${mode}`;
    const pathToEnvConfig = path.join(pathToEnvDir, fileName);
    if (!fs.existsSync(pathToEnvConfig)) {
        throw new Error(`Env file ${fileName} not found`);
    }
};

export default validateEnvironment;
