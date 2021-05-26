import { IconButton, ListItem, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { ClientRoutes } from '../../services/clientRouteContants';
import { ApiRoutes, API_URL } from '../../services/serverRouteContants';
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
    const filepath = `${filesListStore.currentDirectory}/${file.filename}`;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const withClose = (func?: () => any) => {
        setAnchorEl(null);
        if (func) {
            func();
        }
    };

    return (
        <div style={props.style}>
            <ListItem key={file.filename} role="listitem" button={file.isFolder as true}>
                <ListItemIcon>
                    {file.isFolder && <FolderIcon />}
                    {!file.isFolder && <InsertDriveFileIcon />}
                </ListItemIcon>
                {/* <Checkbox checked={false} onChange={handleClick} /> */}
                {file.isFolder && <Link to={`${ClientRoutes.Index}${filepath}`}>{file.filename} </Link>}
                {!file.isFolder && file.filename}
                <IconButton onClick={handleClick}>
                    <MoreHorizIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} onClose={() => withClose()} open={!!anchorEl}>
                    <MenuItem>
                        <a href={`${API_URL}${ApiRoutes.FILE.GET_FILE(filepath)}`} download={file.filename}>
                            Download
                        </a>
                    </MenuItem>
                    <MenuItem onClick={() => withClose(() => filesListStore.removeFile(filepath))}>Remove </MenuItem>
                    <MenuItem>Rename</MenuItem>
                </Menu>
            </ListItem>
        </div>
    );
};
