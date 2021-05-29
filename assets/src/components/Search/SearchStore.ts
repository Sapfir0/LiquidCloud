import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { SearchInteractionService } from '../../services/apiServices/SearchInteractionService';
import { definitions } from ['File'];
 } from '../../shared/types/DTO';

@injectable()
export class SearchStore {
    public searchResult: definitions['File'][] = [];
    protected _apiService: SearchInteractionService;
    public isActive = false;

    constructor(@inject(SERVICE_IDENTIFIER.SearchInteractionService) apiService: SearchInteractionService) {
        this._apiService = apiService;
        makeObservable(this, {
            searchResult: observable,
            search: action,
            setActive: action,
            toggleActive: action,
            isActive: observable,
        });
    }

    public setActive = (state: boolean) => {
        this.isActive = state;
    };

    public toggleActive = () => {
        this.isActive = !this.isActive;
    };

    public search = async (query: string, directory = '.'): Promise<void> => {
        const promiseSearchRes = this._apiService.search(query, directory);
        this.searchResult = await promiseSearchRes;
    };
}
