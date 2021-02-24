import { inject } from 'inversify';
import { action, computed, makeObservable } from 'mobx';
import { join, sep } from 'path';
import { FullTree, NodeData, OnMovePreviousAndNextLocation, TreeItem } from 'react-sortable-tree';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { FileInteractionService } from '../../services/apiServices/FileInteractionService';
import { FileSystemChecker } from '../../services/socket';
import { getTree } from '../../services/treeUtils';
import { FileViewDTO } from '../../shared/types/DTO';
import { FilesTree } from '../../shared/types/Files';
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

    public get treeState(): FileViewDTO[] & TreeItem[] {
        return getTree(this.files);
    }

    public changeState = (state: TreeItem[]): void => {
        this.files = getTree(state as FilesTree[]);
    };

    // public onDragStateChanged = (data: NodeData & FullTree & OnMovePreviousAndNextLocation): void => {};

    public moveFile = (data: NodeData & FullTree & OnMovePreviousAndNextLocation): void => {
        console.log(data);
        const rootDir = data.path[0].split(sep)[1];
        // this.files = getTree(state as FilesTree[]);
        const outputDir = data.nextParentNode?.path ?? rootDir;
        const moveDto = {
            idEntityToMove: data.node.path,
            idOfTheMoveLocation: join(outputDir, data.node.filename),
        };
        console.log(moveDto);
        this._apiService.updateFile()
        // this.updateFile
    };
}
