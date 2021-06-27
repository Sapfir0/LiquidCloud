import { Container } from 'inversify';
import 'reflect-metadata';
import { FileListDropdownStore } from '../components/FileListFactory/FileListFactoryDropdownStore';
import { FilesListFactoryStore } from '../components/FileListFactory/FilesListFactoryStore';
import { FilesListStore } from '../components/FilesList/FileListStore';
import { FileUploadStore } from '../components/FileUpload/FileUploadStore';
import { FileViewStore } from '../components/FileView/FIleViewStore';
import { SearchStore } from '../components/Search/SearchStore';
import { SortableTreeStore } from '../components/SortableTree/SortableTreeStore';
import { TableFileStore } from '../components/Table/TableFileStore';
import ApiInteractionService from '../services/ApiInteractionService';
import { FileInteractionService } from '../services/apiServices/FileInteractionService';
import { SearchInteractionService } from '../services/apiServices/SearchInteractionService';
import BaseApiInteractionService from '../services/BaseApiInteractionService';
import { FileSystemChecker } from '../services/socket';
import { SERVICE_IDENTIFIER } from './inversifyTypes';

const container = new Container();
container.bind<FilesListStore>(SERVICE_IDENTIFIER.FilesListStore).to(FilesListStore).inSingletonScope();
container.bind(SERVICE_IDENTIFIER.BaseApiInteractionService).to(BaseApiInteractionService).inSingletonScope();
container.bind(SERVICE_IDENTIFIER.ApiInteractionService).to(ApiInteractionService).inSingletonScope();
container.bind(SERVICE_IDENTIFIER.FileInteractionService).to(FileInteractionService);
container.bind(SERVICE_IDENTIFIER.FileSystemChecker).to(FileSystemChecker).inSingletonScope();
container.bind(SERVICE_IDENTIFIER.FileListDropdownStore).to(FileListDropdownStore).inSingletonScope();
container.bind(SERVICE_IDENTIFIER.SortableTreeStore).to(SortableTreeStore).inSingletonScope();
container.bind(SERVICE_IDENTIFIER.TableFileStore).to(TableFileStore).inSingletonScope();
container.bind(SERVICE_IDENTIFIER.SearchInteractionService).to(SearchInteractionService).inSingletonScope();
container.bind(SERVICE_IDENTIFIER.SearchStore).to(SearchStore).inSingletonScope();
container.bind(SERVICE_IDENTIFIER.FileUploadStore).to(FileUploadStore).inSingletonScope();
container.bind(SERVICE_IDENTIFIER.FilesListFactoryStore).to(FilesListFactoryStore).inSingletonScope();
container.bind(SERVICE_IDENTIFIER.FileViewStore).to(FileViewStore);


export default container;
