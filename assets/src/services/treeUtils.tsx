import DescriptionIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';
import React from 'react';
import { FlatDataItem, map, TreeItem } from 'react-sortable-tree';
import { FileViewDTO } from '../shared/types/DTO';

export const getTree = (treeData: FileViewDTO[]): TreeItem[] & FileViewDTO[] =>
    map({
        treeData: treeData,
        ignoreCollapsed: false,
        getNodeKey: ({ node: TreeNode, treeIndex: number }) => {
            return number;
        },
        callback: (data: FlatDataItem & { node: FileViewDTO }) => {
            return {
                ...data.node,
                title: (
                    <>
                        {data.node.isFolder ? <FolderIcon /> : <DescriptionIcon />}
                        {data.node.filename}
                    </>
                ),
            };
        },
    }) as TreeItem[] & FileViewDTO[];
