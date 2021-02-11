import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { ClientRouteType } from '../../services/clientRouteContants';
import { FilesListFactoryStore } from '../FileListFactory/FilesListFactoryStore';

@injectable()
export class FilesListStore extends FilesListFactoryStore {
    public currentDirectory = '';

    constructor(
        @inject(SERVICE_IDENTIFIER.FileInteractionService) apiService: FileInteractionService,
        @inject(SERVICE_IDENTIFIER.FileSystemChecker) fileChecker: FileSystemChecker,
    ) {
        super(apiService, fileChecker);
        makeObservable(this, {
            currentDirectory: observable,
            setCurrentDirectory: action,
        });
    }

    public setCurrentDirectory = (currentRoute: ClientRouteType) => (locationPathname: string) => {
        this.currentDirectory = locationPathname.replace(currentRoute, '');
        this.getFiles();
    };
}
