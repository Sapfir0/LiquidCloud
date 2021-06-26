import container from '../../inversify/inversifyContainer';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { definitions } from '../../shared/types/EndpointDescription';
import { FilesListStore } from '../FilesList/FileListStore';

export class FileViewStore {
    public isRenaming = false;
    public newName = ''; // file.filename
    public anchorEl: null | HTMLElement = null;
    private filesListStore = container.get<FilesListStore>(SERVICE_IDENTIFIER.FilesListStore);

    constructor() {

    }

    public setRename = (renameStatus: boolean) => {
        this.isRenaming = renameStatus;
    };

    public handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.anchorEl = event.currentTarget;
    };

    withClose = (afterClose?: () => any): void => {
        this.anchorEl = null;
        if (afterClose) {
            afterClose();
        }
    };

    public keyPress = (file: definitions['File']) => (e: React.KeyboardEvent<HTMLDivElement>): void => {
        if (e.key == 'Enter') {
            this.filesListStore.renameFile(file.filename, this.newName);
            this.setRename(false);
        }
        if (e.key == 'Esc') {
            // TODO сейчас не вызывается
            this.setRename(false);
        }
    };
}
