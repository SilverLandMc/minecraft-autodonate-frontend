import webpack, { Configuration } from 'webpack';
import path from 'path';
import { BuildPaths } from '../build/types/config';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import Dotenv from 'dotenv-webpack';

interface Params {
    config: Configuration;
}

export default ({ config }: Params) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src')
    };
    config.resolve.modules.push(paths.src); // Задаём путь относительно папки конфига для абсолютных импортов
    config.resolve.extensions.push('.ts', '.tsx');
    config.module.rules.push(buildCssLoader({ isDev: true }));

    config.plugins.push(
        new Dotenv(),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(true),
            __API_HOST__: JSON.stringify('/api/v1'),
            __PROXY_TARGET__: JSON.stringify('https://silverland.fun/')
        })
    );

    return config;
};
