import { ListItem, ListItemIcon } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { ClientRoutes } from '../../services/clientRouteContants';
import { useInject } from '../../shared/hooks/injectHook';
import { FileViewDTO } from '../../shared/types/DTO';
import { FilesListStore } from '../FilesList/FileListStore';
import './FileView.css';

export type FileViewProps = {
    file: FileViewDTO;
    style?: React.CSSProperties;
};

export const FileView: FC<FileViewProps> = (props: FileViewProps) => {
    const filesListStore = useInject<FilesListStore>(SERVICE_IDENTIFIER.FilesListStore);
    const { file } = props;
    const newDir = `${filesListStore.currentDirectory}/${file.filename}`;
    return (
        <div style={props.style}>
            <ListItem key={file.filename} role="listitem" button={file.isFolder as true}>
                <ListItemIcon>
                    {file.isFolder && <FolderIcon />}
                    {!file.isFolder && <InsertDriveFileIcon />}
                </ListItemIcon>
                {file.isFolder && <Link to={`${ClientRoutes.Index}${newDir}`}>{file.filename} </Link>}
                {!file.isFolder && file.filename}
            </ListItem>
        </div>
    );
};
