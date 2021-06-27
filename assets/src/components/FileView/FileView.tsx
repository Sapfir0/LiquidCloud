import { IconButton, Input, ListItem, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import mainColor from '@material-ui/core/colors/grey';
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { ClientRoutes } from '../../services/clientRouteContants';
import { ApiRoutes, API_URL } from '../../services/serverRouteContants';
import { useInject } from '../../shared/hooks/injectHook';
import { definitions } from '../../shared/types/EndpointDescription';
import { FilesListStore } from '../FilesList/FileListStore';
import { AbstractFile } from './AbstractFile';
import './FileView.css';
import { FileViewStore } from './FIleViewStore';

export type FileViewProps = {
    file: definitions['File'];
    style?: React.CSSProperties;
};

export const FileView: FC<FileViewProps> = observer((props: FileViewProps) => (props.file.is_folder ? <Folder {...props} /> :  <File {...props} />))

export const File = (props: FileViewProps) => <AbstractFile icon={<InsertDriveFileIcon />}  nameIsLink={false} {...props} />

export const Folder = (props: FileViewProps) => <AbstractFile icon={<FolderIcon />} nameIsLink={true} {...props} />