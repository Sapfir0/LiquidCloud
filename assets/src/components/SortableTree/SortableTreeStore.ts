import { inject } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { FileInteractionService } from '../../services/apiServices/FileInteractionService';
import { FileSystemChecker } from '../../services/socket';
import { getTree } from '../../services/treeUtils';
import { FilesTree } from '../../shared/types/Files';
import { FilesListFactoryStore } from '../FileListFactory/FilesListFactoryStore';

export class SortableTreeStore extends FilesListFactoryStore {
    public state: FilesTree[] = [];

    constructor(
        @inject(SERVICE_IDENTIFIER.FileInteractionService) apiService: FileInteractionService,
        @inject(SERVICE_IDENTIFIER.FileSystemChecker) fileChecker: FileSystemChecker,
    ) {
        super(apiService, fileChecker);
        makeObservable(this, {
            state: observable,
            changeState: action,
        });
        this.state = getTree(this.files);
    }

    public changeState = (state: FilesTree[]) => {
        this.state = state;
        this.getFiles();
    };
}
