import { observer } from 'mobx-react';
import React from 'react';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import 'react-sortable-tree/style.css';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { useInject } from '../../shared/hooks/injectHook';
import { SortableTreeStore } from './SortableTreeStore';

export const SortableFileTree = observer(() => {
    const store = useInject<SortableTreeStore>(SERVICE_IDENTIFIER.SortableTreeStore);

    return (
        <div style={{ height: 400 }}>
            <SortableTree
                theme={FileExplorerTheme}
                treeData={store.treeState}
                onChange={(treeData) => store.changeState(treeData)}
            />
        </div>
    );
});
