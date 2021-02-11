import { FlatDataItem, map } from 'react-sortable-tree';

export const getTree = (treeData) =>
    map({
        treeData: treeData,
        ignoreCollapsed: false,
        getNodeKey: ({ node: TreeNode, treeIndex: number }) => {
            return number;
        },
        callback: (data: FlatDataItem) => {
            return { ...data.node, title: data.node.filename };
        },
    });
