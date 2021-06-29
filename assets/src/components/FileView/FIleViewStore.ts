import { injectable } from 'inversify';
import { makeObservable, observable } from 'mobx';
import { KeyboardEventHandler } from 'react';
import container from '../../inversify/inversifyContainer';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { definitions } from '../../shared/types/EndpointDescription';
import { FilesListStore } from '../FilesList/FileListStore';

@injectable()
export class FileViewStore {
    public isRenaming = false;
    public newName = '';
    public anchorEl: null | HTMLElement = null;
    private filesListStore = container.get<FilesListStore>(SERVICE_IDENTIFIER.FilesListStore);

    constructor() {
        makeObservable(this, {
            isRenaming: observable,
            newName: observable,
            anchorEl: observable,
        });
    }

    public setName = (name: string): void => {
        this.newName = name;
    };

    public setRename = (file: definitions['File']): void => {
        this.isRenaming = true;
        this.newName = file.filename;
    };

    public unsetRename = (): void => {
        this.isRenaming = false;
        this.newName = '';
    };

    public handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        this.anchorEl = event.currentTarget;
    };

    withClose = (afterClose?: () => any): void => {
        this.anchorEl = null;
        if (afterClose) {
            afterClose();
        }
    };

    public keyPress =
        (file: definitions['File']) =>
        (e: any): void => {
            if (e.key == 'Enter') {
                this.filesListStore.renameFile(file.filename, this.newName);
                this.unsetRename();
            }
            if (e.key == 'Escape') {
                this.unsetRename();
            }
        };
}
