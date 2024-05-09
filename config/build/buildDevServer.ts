import { BuildOptions } from './types/config';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

export const buildDevServer = ({
    port,
    proxyTarget,
    cookieSilverlandCommonId
}: BuildOptions): DevServerConfiguration => {
    return {
        port: port,
        open: true, // автоматически открывать страницу в браузере
        historyApiFallback: true, // позволяет проксировать запрос к странице через index-страницу
        proxy: {
            '/api': {
                target: `http://localhost:${port}/`,
                router: () => proxyTarget,
                changeOrigin: true,
                onProxyReq: (proxyReq) => {
                    proxyReq.setHeader('Cookie', `silverland_common_id=${cookieSilverlandCommonId}`);
                }
            },
            '/public/files': {
                target: `http://localhost:${port}/`,
                router: () => proxyTarget,
                changeOrigin: true
            }
        },
        hot: true
    };
};
