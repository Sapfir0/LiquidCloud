import DescriptionIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';
import React from 'react';
import { FlatDataItem, getNodeAtPath, map, TreeItem } from 'react-sortable-tree';
import { FileViewDTO } from '../shared/types/DTO';
import { FilesTree } from '../shared/types/Files';

export const getTree = (treeData: FileViewDTO[], oldTreeData?: FileViewDTO[]): FilesTree[] =>
    map({
        treeData: treeData as FilesTree[],
        ignoreCollapsed: false,
        getNodeKey: ({ node: TreeNode, treeIndex: number }) => {
            return number;
        },
        callback: (data: FlatDataItem & { node: FileViewDTO }) => {
            let isExpanded = data.node.expanded;
            if (oldTreeData !== undefined) {
                const oldNode = getNodeAtPath({
                    treeData: oldTreeData as FilesTree[],
                    path: [data.node.path],
                    getNodeKey: (data) => data.node.path,
                });
                if (oldNode) {
                    isExpanded = oldNode.node.expanded;
                }
            }

            return {
                ...data.node,
                // expanded: isExpanded,
                title: (
                    <>
                        {data.node.isFolder ? <FolderIcon /> : <DescriptionIcon />}
                        {data.node.filename}
                    </>
                ),
            };
        },
    }) as FilesTree[];
