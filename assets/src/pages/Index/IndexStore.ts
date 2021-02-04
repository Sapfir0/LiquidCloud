import { makeObservable, observable } from "mobx";
import { inject } from "mobx-react";
import { SERVICE_IDENTIFIER } from "../../inversify/inversifyTypes";
import { ApiRoutes, API_URL } from "../../services/serverRouteContants";
import { IApiInteractionService } from "../../shared/types/ApiTypes";

export class IndexStore {
  public files: any[] = []

  constructor(@inject(SERVICE_IDENTIFIER.ApiInteractionService) private _apiService: IApiInteractionService) {

      makeObservable(this, { files: observable})
  }

  public getFiles = () => {
    return this._apiService.get(ApiRoutes.FILE.GET_ALL_FILES)
  }

}
