import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { bimap, Either } from 'fp-ts/Either';
import { inject, injectable } from 'inversify';
import * as qs from 'querystring';
import { SERVICE_IDENTIFIER } from '../inversify/inversifyTypes';
import { API_URL } from '../services/serverRouteContants';
import { IApiInteractionService } from '../shared/types/ApiTypes';
import BaseApiInteractionService from './BaseApiInteractionService';
import { BaseInteractionError } from './Errors/BaseInteractionError';
import { NetworkError } from './Errors/NetworkError';

@injectable()
class ApiInteractionService implements IApiInteractionService {
    fetcher: BaseApiInteractionService;

    constructor(@inject(SERVICE_IDENTIFIER.BaseApiInteractionService) baseInteractionService: BaseApiInteractionService) {
        this.fetcher = baseInteractionService;
    }

    public get<T = any>(
        url: string,
        data?: any,
        host: string = API_URL,
        config?: AxiosRequestConfig,
    ): Promise<Either<BaseInteractionError, T>> {
        return this.query<T>({ method: 'get', url: url, params: data, baseURL: host, ...config });
    }

    public post<T = any>(
        url: string,
        data?: any,
        host: string = API_URL,
        settings?: any,
        config?: AxiosRequestConfig,
    ): Promise<Either<BaseInteractionError, T>> {
        const parsedData = settings?.stringify ? qs.stringify(data) : data;
        const parsedConfig = settings?.multipartData ? this.setMultipartDataHeader(config) : config;

        return this.query<T>({ method: 'post', url: url, baseURL: host, data: parsedData, ...parsedConfig });    }

    public put<T = any>(
        url: string,
        data?: any,
        host: string = API_URL,
        settings?: any,
        config?: AxiosRequestConfig,
    ): Promise<Either<BaseInteractionError, T>> {
        return this.query<T>({ method: 'put', url: url, baseURL: host, data: data, ...config });
    }

    public delete<T = any>(
        url: string,
        data?: any,
        host: string = API_URL,
        config?: AxiosRequestConfig,
    ): Promise<Either<BaseInteractionError, T>> {
        return this.query<T>({ method: 'delete', url: url, data: data, baseURL: host, ...config });
    }

    private query = async <T>(config: AxiosRequestConfig) => {
        const newConfig: AxiosRequestConfig = {
            ...config,
        };

        const req = axios.request<T>({ ...newConfig });
        const response = await this.fetcher.request<T>(req);

        return bimap(
            (e: NetworkError) => new BaseInteractionError(e.message),
            (res: AxiosResponse<T>) => res.data,
        )(response);
    };

    private setMultipartDataHeader = (config?: AxiosRequestConfig) => {
        const newConfig: AxiosRequestConfig = {
            ...config,
            headers: {
                'Content-Type': 'multipart/form-data',
                ...config?.headers,
            },
        };
        return newConfig;
    };
}

export default ApiInteractionService;
