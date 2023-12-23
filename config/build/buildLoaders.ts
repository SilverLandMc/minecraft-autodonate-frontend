import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/config";

// конфигурация лоадеров для обработки файлов, отличных от .js

export const buildLoaders = ({isDev}: BuildOptions): webpack.RuleSetRule[] => {

    // Если не используем TS - нужен babel-loader
    const typescriptLoader =  {
        test: /\.tsx?$/,                // regex указывает на файлы, подлежащие обработке лоадером
        use: 'ts-loader',               // какой лоадер использовать
        exclude: /node_modules/,        // что исключить
    };

    const cssLoader = {
            test: /\.s[ac]ss$/i,
            use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        modules: {
                            auto: (resPath: string) => Boolean(resPath.includes('.module')),
                            localIdentName: isDev
                                ? '[path][name]__[local]--[hash:base64:8]'
                                : '[hash:base64:8]'
                        }
                    }
                },
                "sass-loader",  // Compiles Sass to CSS
            ]
    }

    return [
        typescriptLoader,
        cssLoader
    ]
}