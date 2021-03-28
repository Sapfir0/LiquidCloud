import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { FileInteractionService } from '../../services/apiServices/FileInteractionService';
import { ClientRouteType } from '../../services/clientRouteContants';
import { FileSystemChecker } from '../../services/socket';
import { FileViewDTO } from '../../shared/types/DTO';

@injectable()
export class FilesListFactoryStore {
    public files: FileViewDTO[] = [];
    protected _apiService: FileInteractionService;
    public currentDirectory = '';

    constructor(
        @inject(SERVICE_IDENTIFIER.FileInteractionService) apiService: FileInteractionService,
        @inject(SERVICE_IDENTIFIER.FileSystemChecker) fileChecker: FileSystemChecker,
    ) {
        this._apiService = apiService;
        fileChecker.createChannel(() => this.getFiles());
        makeObservable(this, {
            files: observable,
            getFiles: action,
            currentDirectory: observable,
            setCurrentDirectory: action,
        });
    }

    public setCurrentDirectory = (currentRoute: ClientRouteType) => (locationPathname: string) => {
        this.currentDirectory = locationPathname.replace(currentRoute, '');
        console.log(this.currentDirectory);

        this.getFiles();
    };

    public getFiles = async (): Promise<void> => {
        const promiseFiles = this._apiService.getFiles(this.currentDirectory);

        this.files = await promiseFiles;
    };
}
