import HTMLWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { BuildOptions } from "./types/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import Dotenv from "dotenv-webpack";

export const buildPlugins = ({
  paths,
}: BuildOptions): webpack.WebpackPluginInstance[] => [
  new HTMLWebpackPlugin({
    template: paths.html,
  }),
  new webpack.ProgressPlugin(),
  new MiniCssExtractPlugin({
    filename: "css/[name].[contenthash:8].css", // названия для файлов css
    chunkFilename: "css/[name].[contenthash:8].css", // названия для чанков при асинхронной подгрузке
  }),
  new Dotenv(),
];
