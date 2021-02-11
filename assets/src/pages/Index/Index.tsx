import { Card } from '@material-ui/core';
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import { FileListViewDropdown } from '../../components/FileListFactory/FileListFactory';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { ClientRoutes } from '../../services/clientRouteContants';
import { useInject } from '../../shared/hooks/injectHook';
import './Index.css';

const Index: FC = (props) => {
    // const filesListStore = useInject<FilesListStore>(SERVICE_IDENTIFIER.FilesListStore);
    // const loc = useLocation();
    // filesListStore.setCurrentDirectory(ClientRoutes.Index)(loc.pathname);

    return (
        <>
            <Card className="main">
                <div className="main__container">
                    <Breadcrumbs />
                    <FileListViewDropdown />
                    {/* <FilesList /> */}
                    {/* <SortableFileTree /> */}
                </div>
            </Card>
        </>
    );
};

export default Index;
