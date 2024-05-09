import HTMLWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { BuildOptions } from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Dotenv from 'dotenv-webpack';

export const buildPlugins = ({ paths, isDev, apiHost, proxyTarget }: BuildOptions): webpack.WebpackPluginInstance[] => [
    new HTMLWebpackPlugin({
        template: paths.html
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css', // названия для файлов css
        chunkFilename: 'css/[name].[contenthash:8].css' // названия для чанков при асинхронной подгрузке
    }),
    new Dotenv(),
    new webpack.DefinePlugin({
        __IS_DEV__: JSON.stringify(isDev),
        __API_HOST__: JSON.stringify(apiHost),
        __PROXY_TARGET__: JSON.stringify(proxyTarget)
    }),
    new webpack.HotModuleReplacementPlugin()
];
