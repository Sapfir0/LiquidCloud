import DescriptionIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';
import React from 'react';
import { FlatDataItem, getNodeAtPath, map } from 'react-sortable-tree';
import { definitions } from '../shared/types/EndpointDescription';
import { FilesTree } from '../shared/types/Files';

export const getTree = (treeData: definitions['File'][], oldTreeData?: definitions['File'][]): FilesTree[] =>
    map({
        treeData: treeData as FilesTree[],
        ignoreCollapsed: false,
        getNodeKey: ({ node: TreeNode, treeIndex: number }) => {
            return number;
        },
        callback: (data: FlatDataItem & { node: definitions['File'] }) => {
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
                        {data.node.is_folder ? <FolderIcon /> : <DescriptionIcon />}
                        {data.node.filename}
                    </>
                ),
            };
        },
    }) as FilesTree[];
