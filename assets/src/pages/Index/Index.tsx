import { Card } from '@material-ui/core';
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import { FilesList } from '../../components/FilesList/FilesList';
import { FilesListStore } from '../../components/FilesList/FilesListStore';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { ClientRoutes } from '../../services/clientRouteContants';
import { useInject } from '../../shared/hooks/injectHook';
import './Index.css';

export const Index: FC = (props) => {
    const filesListStore = useInject<FilesListStore>(SERVICE_IDENTIFIER.FilesListStore);
    const loc = useLocation();
    filesListStore.setCurrentDirectory(ClientRoutes.Index)(loc.pathname);

    return (
        <>
            <Card className="main">
                <Breadcrumbs />
                Обзор
                <FilesList />
            </Card>
        </>
    );
};
