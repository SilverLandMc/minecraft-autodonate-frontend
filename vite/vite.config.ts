/// <reference types="vitest" />
import { resolve } from 'node:path';
import { ConfigEnv, loadEnv, UserConfigExport } from 'vite';
import getPlugins from './utils/plugins/getPlugins';
import getProxy from './utils/proxy/getProxy';

const envDirName = 'environments';

const defineConfig = ({ mode, command }: ConfigEnv): UserConfigExport => {
    const env = loadEnv(mode, envDirName);
    const apiHost = env.VITE_API_HOST || '/api/v1'; // значение по умолчанию
    const proxyTarget = env.VITE_PROXY_TARGET || 'https://silverland.fun/'; // значение по умолчанию

    const isDev = mode === 'development';
    const isProxyRequired = command === 'serve' && mode !== 'vitest';
    const proxy = isProxyRequired ? getProxy() : undefined;

    return {
        plugins: getPlugins(command),
        envDir: envDirName,

        define: {
            'process.env': {},
            __IS_DEV__: isDev,
            __API_HOST__: JSON.stringify(apiHost),
            __PROXY_TARGET__: JSON.stringify(proxyTarget)
        },
        server: {
            proxy,
            port: 3000,
            open: false
        },
        preview: {
            proxy,
            port: 3010,
            open: false
        },
        css: { postcss: resolve(__dirname, './postcss.config.js') },
        build: {
            outDir: 'build',
            sourcemap: 'hidden'
        },
        resolve: {
            alias: {
                app: resolve(__dirname, '../src/app')
            }
        },
        // @ts-ignore
        test: {
            globals: true,
            include: ['**/__tests__/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
            environment: 'jsdom',
            teardownTimeout: 1000,
            setupFiles: resolve(__dirname, './setupTests.ts')
        }
    };
};

export default defineConfig;
