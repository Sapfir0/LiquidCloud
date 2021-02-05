import { inject, injectable } from "inversify";
import { makeObservable, observable } from "mobx";
import { SERVICE_IDENTIFIER } from "../../inversify/inversifyTypes";
import { ApiRoutes } from "../../services/serverRouteContants";
import { IApiInteractionService } from "../../shared/types/ApiTypes";

@injectable()
export class FilesListStore {
  public files: any[] = []
  private _apiService: IApiInteractionService

  constructor(@inject(SERVICE_IDENTIFIER.ApiInteractionService) apiService: IApiInteractionService) {
      this._apiService = apiService
      makeObservable(this, { files: observable})
  }

  public getFiles = () => {
    this.files = this._apiService.get(ApiRoutes.FILE.GET_ALL_FILES)
    console.log(this.files);

  }

}
