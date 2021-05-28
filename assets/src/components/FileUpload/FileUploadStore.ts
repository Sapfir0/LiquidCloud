import { inject, injectable } from 'inversify';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { FileInteractionService } from '../../services/apiServices/FileInteractionService';
import { FilesListFactoryStore } from '../FileListFactory/FilesListFactoryStore';

@injectable()
export class FileUploadStore {
    fileStore: FilesListFactoryStore;
    fileUploadStore: FileInteractionService;
    constructor(
        @inject(SERVICE_IDENTIFIER.FilesListStore) fileService: FilesListFactoryStore,
        @inject(SERVICE_IDENTIFIER.FileInteractionService) fileUploadService: FileInteractionService,
    ) {
        this.fileStore = fileService;
        this.fileUploadStore = fileUploadService;
    }

    public selectFile = (event: any): void => {
        const file = event.target.files[0];
        this.fileUploadStore.uploadFile(file, this.fileStore.currentDirectory);
    };
}
