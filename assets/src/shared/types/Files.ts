import { TreeItem } from 'react-sortable-tree';
import { definitions } from './EndpointDescription';

export type FilesTree = definitions['File'] & TreeItem;
