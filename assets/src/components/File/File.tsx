import { ListItem, ListItemIcon } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import React, { FC, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FilesListStore } from '../FileListFactory/FilesListFactoryStore';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { ClientRoutes } from '../../services/clientRouteContants';
import { useInject } from '../../shared/hooks/injectHook';
import { FileViewDTO } from '../../shared/types/DTO';
import './FileView.css';

export type FileViewProps = {
    file: FileViewDTO;
};

export const FileView: FC<FileViewProps> = (props: FileViewProps) => {
    const filesListStore = useInject<FilesListStore>(SERVICE_IDENTIFIER.FilesListStore);
    const history = useHistory();

    useEffect(() => {
        return history.listen((location: { pathname: string }) => {
            filesListStore.setCurrentDirectory(ClientRoutes.Index)(location.pathname); // подразумевается, что  мы находимся на этой странице
        });
    }, [history]);

    const { file } = props;
    const newDir = `${filesListStore.currentDirectory}/${file.filename}`;
    return (
        <>
            <ListItem key={file.filename} role="listitem" button={file.isFolder as true}>
                <ListItemIcon>
                    {file.isFolder && <FolderIcon />}
                    {!file.isFolder && <InsertDriveFileIcon />}
                </ListItemIcon>
                {file.isFolder && <Link to={`${ClientRoutes.Index}${newDir}`}>{file.filename} </Link>}
                {!file.isFolder && file.filename}
            </ListItem>{' '}
        </>
    );
};
