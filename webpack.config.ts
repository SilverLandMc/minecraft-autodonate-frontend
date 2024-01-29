import webpack from 'webpack';
import path from 'path';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';

export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'), // entry - стартовая точка приложения, resolve склеивает путь
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src')
    };

    const mode = env.mode || 'development';
    const PORT = env.port || 3000;
    const proxyTarget = env.proxyTarget || 'https://silverland.fun/';
    const apiHost = env.apiHost || '/api/v1';

    const isDev = mode === 'development';

    // аналог экспортов JS, но для Node.js
    const config: webpack.Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT,
        proxyTarget,
        apiHost
    });

    return config;
};
