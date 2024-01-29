import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import queryString from 'query-string';
import createLogger from 'shared/lib/logger/logger';

interface LowLevelRequestConfig extends AxiosRequestConfig {
    /**
     * Допустимые коды ошибок, о которых не нужно сообщать
     */
    allowedErrorStatuses?: number[];
}

const requestLogger = createLogger('requestLogger');
const axiosInstance = axios.create({
    baseURL: __API_HOST__,
    timeout: 10 * 1000,
    paramsSerializer: (params) => queryString.stringify(params)
});

export const lowLevelRequest = async <T>({
    allowedErrorStatuses = [],
    ...params
}: LowLevelRequestConfig): Promise<AxiosResponse<T>> => {
    try {
        return await axiosInstance.request<T>(params);
    } catch (error) {
        const responseStatus = error.isAxiosError ? (error as AxiosError)?.response?.status : undefined;
        if (responseStatus && allowedErrorStatuses.includes(responseStatus)) {
            requestLogger.info(
                `catch error while requesting ${params.method ?? 'GET'} ${params.url}; status ${responseStatus} allowed`
            );
            throw error;
        }

        requestLogger.error(`catch error while requesting ${params.method} ${params.url}. error: ${error}`);
        throw error;
    }
};

export type RequestConfig = Omit<LowLevelRequestConfig, 'withCredentials'>;
export const request = async <T>(params: RequestConfig) =>
    (await lowLevelRequest<T>({ ...params, withCredentials: true })).data;

export const post = async <T>(params: Omit<RequestConfig, 'method'>) => request<T>({ ...params, method: 'POST' });
export const put = async <T>(params: Omit<RequestConfig, 'method'>) => request<T>({ ...params, method: 'PUT' });
