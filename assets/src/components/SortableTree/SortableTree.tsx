import { observer } from 'mobx-react';
import React from 'react';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import 'react-sortable-tree/style.css';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { getTree } from '../../services/treeUtils';
import { useInject } from '../../shared/hooks/injectHook';
import { SortableTreeStore } from './SortableTreeStore';

export const SortableFileTree = observer(() => {
    const store = useInject<SortableTreeStore>(SERVICE_IDENTIFIER.SortableTreeStore);

    const initialState = store.files;
    return (
        <div style={{ height: 400 }}>
            <SortableTree
                theme={FileExplorerTheme}
                treeData={getTree(initialState)}
                onChange={(treeData) => store.changeState(treeData)}
            />
        </div>
    );
});
