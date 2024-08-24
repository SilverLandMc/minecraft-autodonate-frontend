import { Configuration } from 'webpack';
import path from 'path';
import { BuildPaths } from '../build/types/config';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

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
    return config;
};
