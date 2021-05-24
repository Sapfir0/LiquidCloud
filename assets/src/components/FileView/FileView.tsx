import { IconButton, ListItem, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
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

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={props.style}>
            <ListItem key={file.filename} role="listitem" button={file.isFolder as true}>
                <ListItemIcon>
                    {file.isFolder && <FolderIcon />}
                    {!file.isFolder && <InsertDriveFileIcon />}
                </ListItemIcon>
                {/* <Checkbox checked={false} onChange={handleClick} /> */}
                {file.isFolder && <Link to={`${ClientRoutes.Index}${newDir}`}>{file.filename} </Link>}
                {!file.isFolder && file.filename}
                <IconButton onClick={handleClick}>
                    <MoreHorizIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} onClose={handleClose} open={!!anchorEl}>
                    <MenuItem>Download</MenuItem>
                    <MenuItem>Remove</MenuItem>
                    <MenuItem>Rename</MenuItem>
                </Menu>
            </ListItem>
        </div>
    );
};
