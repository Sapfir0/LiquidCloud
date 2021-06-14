import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { SearchInteractionService } from '../../services/apiServices/SearchInteractionService';
import { definitions } from '../../shared/types/EndpointDescription';

@injectable()
export class SearchStore {
    public searchResult: definitions['File'][] = [];
    protected _apiService: SearchInteractionService;
    public isActive = false;

    public get hasResults(): boolean {
        return this.isActive && this.searchResult.length !== 0;
    }

    constructor(@inject(SERVICE_IDENTIFIER.SearchInteractionService) apiService: SearchInteractionService) {
        this._apiService = apiService;
        makeObservable(this, {
            searchResult: observable,
            search: action,
            setActive: action,
            setDisabled: action,
            isActive: observable,
        });
    }

    public setActive = (): void => {
        this.isActive = true;
    };

    public setDisabled = (): void => {
        this.isActive = false;
        this.searchResult = [];
    };

    public search = async (query: string, directory = '.'): Promise<void> => {
        if (query !== '') {
            const promiseSearchRes = this._apiService.search(query, directory);
            this.searchResult = await promiseSearchRes;
        }
    };
}
