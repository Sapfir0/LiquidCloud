import { inject, injectable } from "inversify";
import { makeObservable, observable } from "mobx";
import { FileSystemChecker } from "../../services/socket";
import { SERVICE_IDENTIFIER } from "../../inversify/inversifyTypes";
import { FileInteractionService } from "../../services/apiServices/FileInteractionService";
import { ApiRoutes } from "../../services/serverRouteContants";
import { IApiInteractionService } from "../../shared/types/ApiTypes";
import { FileViewDTO } from "../../shared/types/DTO";

@injectable()
export class FilesListStore {
  public files: FileViewDTO[] = []
  private _apiService: FileInteractionService

  constructor(@inject(SERVICE_IDENTIFIER.FileInteractionService) apiService: FileInteractionService,
  @inject(SERVICE_IDENTIFIER.FileSystemChecker) fileChecker: FileSystemChecker) {
      this._apiService = apiService
      fileChecker.createChannel(() => this.getFiles())
      makeObservable(this, { files: observable})
  }

  public getFiles = async () => {
    this.files = await this._apiService.getFiles()
    // if (this._apiService.isLastRequestErrored) {
    //   this.setError()
    // }

  }

}
