import { Card } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import { FileListViewDropdown } from '../../components/FileListFactory/FileListFactory';
import {
    FileListDropdownStore,
    FileListViewDropdownEnum,
} from '../../components/FileListFactory/FileListFactoryDropdownStore';
import { FilesListStore } from '../../components/FilesList/FileListStore';
import { FilesList } from '../../components/FilesList/FilesList';
import { SortableFileTree } from '../../components/SortableTree/SortableTree';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { useInject } from '../../shared/hooks/injectHook';
import './Index.css';

const comp: Map<FileListViewDropdownEnum, JSX.Element> = new Map();
comp.set(FileListViewDropdownEnum.Tree, <SortableFileTree />);
comp.set(FileListViewDropdownEnum.List, <FilesList />);

const Index: FC = observer((props) => {
    const store = useInject<FileListDropdownStore>(SERVICE_IDENTIFIER.FileListDropdownStore);
    const filesListStore = useInject<FilesListStore>(SERVICE_IDENTIFIER.FilesListStore);
    const loc = useLocation();
    console.log(filesListStore.currentDirectory);

    return (
        <>
            <Card className="main">
                <div className="main__container">
                    <Breadcrumbs />
                    <FileListViewDropdown />
                    {comp.get(store.currentItem)}
                </div>
            </Card>
        </>
    );
});

export default Index;
