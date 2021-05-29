import { TreeItem } from 'react-sortable-tree';
import { definitions } from ['File'];
 } from './DTO';

export type FilesTree = definitions['File'] & TreeItem;
