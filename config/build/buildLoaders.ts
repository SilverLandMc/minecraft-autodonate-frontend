import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';

// конфигурация лоадеров для обработки файлов, отличных от .js

export const buildLoaders = ({ isDev }: BuildOptions): webpack.RuleSetRule[] => {
    // Если не используем TS - нужен babel-loader
    const typescriptLoader = {
        test: /\.tsx?$/, // regex указывает на файлы, подлежащие обработке лоадером
        use: 'ts-loader', // какой лоадер использовать
        exclude: /node_modules/ // что исключить
    };

    const scssLoader = buildCssLoader({ isDev });

    const cssLoader = {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
    };

    const fileLoader = {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
    };

    return [typescriptLoader, cssLoader, scssLoader, fileLoader];
};
