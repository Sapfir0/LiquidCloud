import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { FileInteractionService } from '../../services/apiServices/FileInteractionService';
import { ClientRouteType } from '../../services/clientRouteContants';
import { FileSystemChecker } from '../../services/socket';
import { definitions } from '../../shared/types/EndpointDescription';
@injectable()
export class FilesListFactoryStore {
    public files: definitions['File'][] = [];
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
        this.getFiles();
    };

    public getFiles = async (): Promise<void> => {
        const files = await this._apiService.getFiles(this.currentDirectory);
        if (files) {
            this.files = files;
        }
    };

    public removeFile = async (path: string): Promise<void> => {
        const promiseFiles = this._apiService.removeFile(path);

        await promiseFiles;
    };

    public renameFile = async (oldPath: string, newPath: string): Promise<void> => {
        const promiseFiles = this._apiService.updateFile(oldPath, newPath);

        await promiseFiles;
    };

    public getFile = async (path: string): Promise<void> => {
        const promiseFiles = this._apiService.getFile(path);

        await promiseFiles;
    };
}
