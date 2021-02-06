import { Container } from 'inversify';
import 'reflect-metadata';
import { FileSystemChecker } from '../services/socket';
import { FilesListStore } from '../components/FilesList/FilesListStore';
import ApiInteractionService from '../services/ApiInteractionService';
import { FileInteractionService } from '../services/apiServices/FileInteractionService';
import BaseApiInteractionService from '../services/BaseApiInteractionService';
import { SERVICE_IDENTIFIER } from './inversifyTypes';

const container = new Container();
container.bind<FilesListStore>(SERVICE_IDENTIFIER.FilesListStore).to(FilesListStore)
container.bind(SERVICE_IDENTIFIER.BaseApiInteractionService).to(BaseApiInteractionService)
container.bind(SERVICE_IDENTIFIER.ApiInteractionService).to(ApiInteractionService)
container.bind(SERVICE_IDENTIFIER.FileInteractionService).to(FileInteractionService)
container.bind(SERVICE_IDENTIFIER.FileSystemChecker).to(FileSystemChecker).inSingletonScope()
export default container;
