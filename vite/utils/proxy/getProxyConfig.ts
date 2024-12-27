import { existsSync } from 'fs';
import { resolve } from 'path';
import { config, DotenvPopulateInput } from 'dotenv';
import { createLogger } from 'vite';

const logger = createLogger('info', { prefix: '[getProxyConfig]' });

interface ProxyConfig {
    API_HOST: string;
    AUTH_TOKEN?: string;
}

const getProxyConfig = (): ProxyConfig => {
    let pathToConfig = resolve(process.cwd(), 'vite/.env.proxy');
    logger.info(`Path to proxy config: ${pathToConfig}`);

    const proxyConfig = {} as ProxyConfig;
    if (existsSync(pathToConfig)) {
        config({
            path: pathToConfig,
            processEnv: proxyConfig as unknown as DotenvPopulateInput
        });
    } else {
        throw new Error('Proxy settings required for developing. Please, read comments in .env.proxy.example');
    }

    logger.info(`Proxy target: ${proxyConfig.API_HOST}`);

    return proxyConfig;
};

export default getProxyConfig;
