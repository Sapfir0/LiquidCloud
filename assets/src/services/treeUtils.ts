import { FlatDataItem, map, TreeItem } from 'react-sortable-tree';
import { FileViewDTO } from '../shared/types/DTO';

export const getTree = (treeData: FileViewDTO[]): TreeItem[] & FileViewDTO[] =>
    map({
        treeData: treeData,
        ignoreCollapsed: false,
        getNodeKey: ({ node: TreeNode, treeIndex: number }) => {
            return number;
        },
        callback: (data: FlatDataItem) => {
            return { ...data.node, title: data.node.filename };
        },
    }) as TreeItem[] & FileViewDTO[];
