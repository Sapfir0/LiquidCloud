import { inject } from 'inversify';
import { action, computed, makeObservable } from 'mobx';
import { map, TreeItem } from 'react-sortable-tree';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { FileInteractionService } from '../../services/apiServices/FileInteractionService';
import { FileSystemChecker } from '../../services/socket';
import { getTree } from '../../services/treeUtils';
import { FilesListFactoryStore } from '../FileListFactory/FilesListFactoryStore';

export class SortableTreeStore extends FilesListFactoryStore {
    constructor(
        @inject(SERVICE_IDENTIFIER.FileInteractionService) apiService: FileInteractionService,
        @inject(SERVICE_IDENTIFIER.FileSystemChecker) fileChecker: FileSystemChecker,
    ) {
        super(apiService, fileChecker);
        makeObservable(this, {
            changeState: action,
            treeState: computed,
        });
    }

    public get treeState() {
        return getTree(this.files);
    }

    public changeState = (state: TreeItem[]) => {
        this.files = getTree(state);
    };
}
