import { isRight } from 'fp-ts/lib/Either';
import { inject, injectable } from 'inversify';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { IApiInteractionService } from '../../shared/types/ApiTypes';
import { BaseInteractionError } from '../Errors/BaseInteractionError';
import { ApiRoutes, API_URL } from '../serverRouteContants';
import { definitions } from ['File'];
 } from '../../shared/types/DTO';

@injectable()
export class FileInteractionService {
    public isLastRequestErrored: BaseInteractionError | null = null;
    public defaultElementsPerPage: undefined | number = undefined;
    public defaultPage = 0;

    constructor(@inject(SERVICE_IDENTIFIER.ApiInteractionService) protected _apiService: IApiInteractionService) {}

    public getFiles = async (directory = '.', page = this.defaultPage, perPage = this.defaultElementsPerPage) => {
        const res = await this._apiService.get<{ data: definitions['File'][] }>(ApiRoutes.FILE.GET_ALL_FILES, {
            directory,
            page,
            page_size: perPage,
        });
        if (isRight(res)) {
            return res.right.data;
        } else {
            this.isLastRequestErrored = res.left;
        }
    };

    public updateFile = async (oldDirectory: string, newDirectory: string) => {
        const res = await this._apiService.put<{ data: definitions['File'][] }>(ApiRoutes.FILE.GET_ALL_FILES, {
            oldPath: oldDirectory,
            newPath: newDirectory,
        });
        if (isRight(res)) {
            return res.right.data;
        } else {
            this.isLastRequestErrored = res.left;
        }
    };

    public uploadFile = async (file: File, directory: string) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('directory', directory)

        const res = await this._apiService.post<{ data: definitions['File'][] }>(
            ApiRoutes.FILE.GET_ALL_FILES,
            formData,
            API_URL,
            { multipartData: true },
        );
        if (isRight(res)) {
            return res.right.data;
        } else {
            this.isLastRequestErrored = res.left;
        }
    };

    // deprecated
    public getFile = async (path: string) => {
        const res = await this._apiService.get<{ data: definitions['File'][] }>(ApiRoutes.FILE.GET_FILE(path), {
            path: path,
        });
        if (isRight(res)) {
            return res.right.data;
        } else {
            this.isLastRequestErrored = res.left;
        }
    };

    public removeFile = async (path: string) => {
        const res = await this._apiService.delete<{ data: definitions['File'][] }>(ApiRoutes.FILE.GET_ALL_FILES, {
            path: path,
        });
        if (isRight(res)) {
            return res.right.data;
        } else {
            this.isLastRequestErrored = res.left;
        }
    };
}
