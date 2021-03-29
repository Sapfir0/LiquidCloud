import { isRight } from 'fp-ts/lib/Either';
import { inject, injectable } from 'inversify';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { IApiInteractionService } from '../../shared/types/ApiTypes';
import { BaseInteractionError } from '../Errors/BaseInteractionError';
import { ApiRoutes } from '../serverRouteContants';

@injectable()
export class SearchInteractionService {
    public isLastRequestErrored: BaseInteractionError | null = null;

    constructor(@inject(SERVICE_IDENTIFIER.ApiInteractionService) protected _apiService: IApiInteractionService) {}

    public search = async (query: string, directory: string) => {
        const res = await this._apiService.get(ApiRoutes.SEARCH.GET_SEARCH, {
            directory,
            query,
        });
        if (isRight(res)) {
            return res.right.data;
        } else {
            this.isLastRequestErrored = res.left;
        }
    };
}
