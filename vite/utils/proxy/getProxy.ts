import { CommonServerOptions, ProxyOptions } from 'vite';
import getProxyConfig from './getProxyConfig';

const getProxy = (): CommonServerOptions['proxy'] | undefined => {
    const { API_HOST, AUTH_TOKEN } = getProxyConfig();

    const proxyConfigure: ProxyOptions['configure'] = (proxy) => {
        proxy.on('proxyReq', (proxyReq) => {
            if (!AUTH_TOKEN) {
                return;
            }

            proxyReq.setHeader('cookie', `silverland_common_id=${AUTH_TOKEN}`);
        });
    };

    return {
        '/api': {
            target: API_HOST,
            secure: false,
            changeOrigin: true,
            configure: proxyConfigure
        }
    };
};

export default getProxy;
