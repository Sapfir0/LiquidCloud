import { isRight } from "fp-ts/lib/Either";
import { inject, injectable } from "inversify";
import { SERVICE_IDENTIFIER } from "../../inversify/inversifyTypes";
import { IApiInteractionService } from "../../shared/types/ApiTypes";
import { FileViewDTO } from "../../shared/types/DTO";
import { BaseInteractionError } from "../Errors/BaseInteractionError";
import { ApiRoutes } from "../serverRouteContants";

@injectable()
export class FileInteractionService {
  public isLastRequestErrored: BaseInteractionError | null = null;

  constructor(@inject(SERVICE_IDENTIFIER.ApiInteractionService) protected _apiService: IApiInteractionService) {

  }

  public getFiles = async (directory=".") => {
    
    const res = await this._apiService.get<{data: FileViewDTO[]}>(ApiRoutes.FILE.GET_ALL_FILES, {directory})
    if (isRight(res)) {
      return res.right.data
    } else {
      this.isLastRequestErrored = res.left
    }
  }

}
