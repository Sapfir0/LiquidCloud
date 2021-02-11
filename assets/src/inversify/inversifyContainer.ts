import { Container } from 'inversify';
import 'reflect-metadata';
import { FileListDropdownStore } from '../components/FileListFactory/FileListFactoryDropdownStore';
import { FilesListStore } from '../components/FilesList/FileListStore';
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
container.bind(SERVICE_IDENTIFIER.FileListDropdownStore).to(FileListDropdownStore);

export default container;
