import { inject, injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import { SERVICE_IDENTIFIER } from "../../inversify/inversifyTypes";
import { FileInteractionService } from "../../services/apiServices/FileInteractionService";
import { FileSystemChecker } from "../../services/socket";
import { FileViewDTO } from "../../shared/types/DTO";

@injectable()
export class FilesListStore {
  public files: FileViewDTO[] = []
  private _apiService: FileInteractionService
  public currentDirectory = ""
  constructor(@inject(SERVICE_IDENTIFIER.FileInteractionService) apiService: FileInteractionService,
  @inject(SERVICE_IDENTIFIER.FileSystemChecker) fileChecker: FileSystemChecker) {
      this._apiService = apiService
      fileChecker.createChannel(() => this.getFiles())
      makeObservable(this, { files: observable, currentDirectory: observable,
        setCurrentDirectory: action, getFiles: action})
      // this.getFiles()
  }

  public openDirectory(folder: string) {
    console.log(this.currentDirectory + folder);
    this.setCurrentDirectory(this.currentDirectory + '/' + folder)
  }



  public setCurrentDirectory(curDir: string) {
    console.log(curDir);
    this.currentDirectory = curDir
    this.getFiles()
  }


  public getFiles = async () => {
    console.log("getFiles");

    this.files = await this._apiService.getFiles(this.currentDirectory)
    // if (this._apiService.isLastRequestErrored) {
    //   this.setError()
    // }

  }

}
