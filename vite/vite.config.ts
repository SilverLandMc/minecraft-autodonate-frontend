/// <reference types="vitest" />
import { resolve } from 'node:path';
import { ConfigEnv, UserConfigExport } from 'vite';
import getPlugins from './utils/plugins/getPlugins';
import getProxy from './utils/proxy/getProxy';

const envDirName = 'environments';

const defineConfig = ({ mode, command }: ConfigEnv): UserConfigExport => {
    // if (!isPreview) {
    //     validateEnvironment({ envDirName, mode });
    // }

    const isProxyRequired = command === 'serve' && mode !== 'vitest';
    const proxy = isProxyRequired ? getProxy() : undefined;

    return {
        plugins: getPlugins(command),
        envDir: envDirName,
        define: { 'process.env': {} },
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
        test: {
            include: ['**/__tests__/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
            environment: 'jsdom',
            teardownTimeout: 1000
        }
    };
};

export default defineConfig;
