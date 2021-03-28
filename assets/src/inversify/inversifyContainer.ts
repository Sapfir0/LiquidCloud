import { Container } from 'inversify';
import 'reflect-metadata';
import { FileListDropdownStore } from '../components/FileListFactory/FileListFactoryDropdownStore';
import { FilesListStore } from '../components/FilesList/FileListStore';
import { SortableTreeStore } from '../components/SortableTree/SortableTreeStore';
import { TableFileStore } from '../components/Table/TableFileStore';
import ApiInteractionService from '../services/ApiInteractionService';
import { FileInteractionService } from '../services/apiServices/FileInteractionService';
import BaseApiInteractionService from '../services/BaseApiInteractionService';
import { FileSystemChecker } from '../services/socket';
import { SERVICE_IDENTIFIER } from './inversifyTypes';

const container = new Container();
container.bind<FilesListStore>(SERVICE_IDENTIFIER.FilesListStore).to(FilesListStore).inSingletonScope();
container.bind(SERVICE_IDENTIFIER.BaseApiInteractionService).to(BaseApiInteractionService);
container.bind(SERVICE_IDENTIFIER.ApiInteractionService).to(ApiInteractionService);
container.bind(SERVICE_IDENTIFIER.FileInteractionService).to(FileInteractionService);
container.bind(SERVICE_IDENTIFIER.FileSystemChecker).to(FileSystemChecker).inSingletonScope();
container.bind(SERVICE_IDENTIFIER.FileListDropdownStore).to(FileListDropdownStore).inSingletonScope();
container.bind(SERVICE_IDENTIFIER.SortableTreeStore).to(SortableTreeStore);
container.bind(SERVICE_IDENTIFIER.TableFileStore).to(TableFileStore);

export default container;
