import { CommonServerOptions } from 'vite';
import getProxyConfig from './getProxyConfig';

const getProxy = (): CommonServerOptions['proxy'] | undefined => {
    const { API_HOST } = getProxyConfig();

    return {
        '/api': {
            target: API_HOST,
            secure: false,
            changeOrigin: true
        }
    };
};

export default getProxy;
