import { Card } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { throttle } from 'throttle-debounce';
import Breadcrumbs from '../../components/Breadcrumbs';
import { FileListViewDropdown } from '../../components/FileListFactory/FileListFactory';
import {
    FileListDropdownStore,
    FileListViewDropdownEnum,
} from '../../components/FileListFactory/FileListFactoryDropdownStore';
import { FilesListStore } from '../../components/FilesList/FileListStore';
import { FilesList } from '../../components/FilesList/FilesList';
import { SortableFileTree } from '../../components/SortableTree/SortableTree';
import { FileTable } from '../../components/Table/Table';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { ClientRoutes } from '../../services/clientRouteContants';
import { useInject } from '../../shared/hooks/injectHook';
import './Index.css';

const comp: Map<FileListViewDropdownEnum, JSX.Element> = new Map();
comp.set(FileListViewDropdownEnum.Tree, <SortableFileTree />);
comp.set(FileListViewDropdownEnum.List, <FilesList />);
comp.set(FileListViewDropdownEnum.Table, <FileTable />);

const Index: FC = observer((props) => {
    const store = useInject<FileListDropdownStore>(SERVICE_IDENTIFIER.FileListDropdownStore);
    const filesListStore = useInject<FilesListStore>(SERVICE_IDENTIFIER.FilesListStore);

    const history = useHistory();

    useEffect(() => {
        return history.listen((location: { pathname: string }) => {
            const debouncedMoving = throttle(1000, () => {
                filesListStore.setCurrentDirectory(ClientRoutes.Index)(location.pathname); // подразумевается, что  мы находимся на этой странице
            });
            debouncedMoving();
        });
    });

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
