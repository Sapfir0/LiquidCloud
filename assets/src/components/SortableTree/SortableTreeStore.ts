import { inject } from 'inversify';
import { action, computed, makeObservable } from 'mobx';
import { join, sep } from 'path';
import { FullTree, NodeData, OnMovePreviousAndNextLocation, TreeItem } from 'react-sortable-tree';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { FileInteractionService } from '../../services/apiServices/FileInteractionService';
import { FileSystemChecker } from '../../services/socket';
import { getTree } from '../../services/treeUtils';
import { definitions } from '../../shared/types/EndpointDescription';
import { FilesTree } from '../../shared/types/Files';
import { FilesListFactoryStore } from '../FileListFactory/FilesListFactoryStore';


export class SortableTreeStore extends FilesListFactoryStore {
    public previousTree: FilesTree[] = [];
    public files: FilesTree[] = [];

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

    public get treeState(): definitions['File'][] & TreeItem[] {
        return getTree(this.files);
    }

    public changeState = (state: TreeItem[]): void => {
        this.files = getTree(state as FilesTree[], this.previousTree);
        console.log('Changing');
    };

    public moveFile = (data: NodeData & FullTree & OnMovePreviousAndNextLocation): void => {
        this.previousTree = this.files;
        const rootDir = data.path[0].toString().split(sep)[1];

        const outputDir = data.nextParentNode?.path ?? rootDir;

        this._apiService.updateFile(data.node.path, join(outputDir, data.node.filename));
        console.log('Moving');
    };
}
