import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { IndexRange } from 'react-virtualized';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { FileInteractionService } from '../../services/apiServices/FileInteractionService';
import { FileSystemChecker } from '../../services/socket';
import { FilesListFactoryStore } from '../FileListFactory/FilesListFactoryStore';

@injectable()
export class TableFileStore extends FilesListFactoryStore {
    public page = 0;
    public perPage = 20;
    public scrollToIndex: number | undefined = undefined;

    constructor(
        @inject(SERVICE_IDENTIFIER.FileInteractionService) apiService: FileInteractionService,
        @inject(SERVICE_IDENTIFIER.FileSystemChecker) fileChecker: FileSystemChecker,
    ) {
        super(apiService, fileChecker);
        makeObservable(this, {
            page: observable,
            scrollToIndex: observable,
            handlePageChange: action,
            handleRowsScroll: action,
        });
    }

    public getFiles = async (): Promise<void> => {
        this.files = (await this._apiService.getFiles(this.currentDirectory, this.page, this.perPage)) as any;
    };

    public handleRowsScroll = ({ stopIndex }: IndexRange): void => {
        this.page = Math.ceil(stopIndex / this.perPage);
        this.scrollToIndex = undefined;
    };

    public handlePageChange = (page: number): void => {
        this.page = page;
        this.scrollToIndex = (page - 1) * this.perPage;
    };
}
