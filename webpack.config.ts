import webpack from 'webpack';
import dotenv from 'dotenv';
import os from 'os';
import path from 'path';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';

export default (env: BuildEnv) => {
    dotenv.config();

    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'), // entry - стартовая точка приложения, resolve склеивает путь
        build: path.resolve(os.homedir(), 'html', 'html'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src')
    };

    const mode = env.mode || 'development';
    const isDev = mode === 'development';
    const PORT = env.port || 3000;

    const proxyTarget = env.proxyTarget || 'https://silverland.fun/';
    const apiHost = env.apiHost || '/api/v1';
    const cookieSilverlandCommonId = process.env.COOKIE_SILVERLAND_COMMON_ID;

    // аналог экспортов JS, но для Node.js
    const config: webpack.Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT,
        proxyTarget,
        apiHost,
        cookieSilverlandCommonId
    });

    return config;
};
