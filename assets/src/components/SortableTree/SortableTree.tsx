import { observer } from 'mobx-react';
import React, { useState } from 'react';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import 'react-sortable-tree/style.css';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { useInject } from '../../shared/hooks/injectHook';
import { FileViewDTO } from '../../shared/types/DTO';
import { FilesListStore } from '../FileListFactory/FilesListFactoryStore';

const preorderTree = (file: FileViewDTO, parent: null | FileViewDTO) => {
    let children = null;
    if (file.children) {
        children = file.children.map((child) => {
            preorderTree(child, file);
            return { ...child, title: child.filename };
        });
    }
    return { ...file, title: file.filename, children: children };
};

const getTree = (files: FileViewDTO[]) => {
    return files.map((file) => preorderTree(file, null));
};

export const SortableFileTree = observer(() => {
    const store = useInject<FilesListStore>(SERVICE_IDENTIFIER.FilesListStore);
    const initialState = store.files;
    return (
        <div style={{ height: 400 }}>
            <SortableTree
                theme={FileExplorerTheme}
                treeData={getTree(initialState)}
                // onChange={(treeData) => setState(treeData)}
            />
        </div>
    );
});
