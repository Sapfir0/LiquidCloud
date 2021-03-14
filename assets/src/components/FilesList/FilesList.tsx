import { List } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { FileView } from '../../components/File/File';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { ClientRoutes } from '../../services/clientRouteContants';
import { useInject } from '../../shared/hooks/injectHook';
import { FilesListStore } from './FileListStore';

export const FilesList: FC = observer((props) => {
    const filesListStore = useInject<FilesListStore>(SERVICE_IDENTIFIER.FilesListStore);
    return (
        <>
            <List dense role="list">
                {filesListStore.files.map((el) => (
                    <FileView key={el.filename} file={el} />
                ))}
            </List>
        </>
    );
});
