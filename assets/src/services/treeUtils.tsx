import DescriptionIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';
import React from 'react';
import { FlatDataItem, getNodeAtPath, map, TreeItem } from 'react-sortable-tree';
import { FileViewDTO } from '../shared/types/DTO';

export const getTree = (treeData: FileViewDTO[], oldTreeData?: FileViewDTO[]): TreeItem[] & FileViewDTO[] =>
    map({
        treeData: treeData,
        ignoreCollapsed: false,
        getNodeKey: ({ node: TreeNode, treeIndex: number }) => {
            return number;
        },
        callback: (data: FlatDataItem & { node: FileViewDTO }) => {
            let isExpanded = data.node.expanded;
            if (oldTreeData !== undefined) {
                const oldNode = getNodeAtPath({
                    treeData: oldTreeData,
                    path: [data.node.path],
                    getNodeKey: (data) => data.node.path,
                });
                if (oldNode) {
                    isExpanded = oldNode.node.expanded;
                }
                // console.log(oldNode?.node.path, isExpanded);
            }
            // console.log(data.node.path, data.node.expanded);
            // console.log(data.node.path, isExpanded);

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
    }) as TreeItem[] & FileViewDTO[];
