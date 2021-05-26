import { IconButton, Input, ListItem, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React, { FC, useState } from 'react';
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

    const keyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key == 'Enter') {
            filesListStore.renameFile(file.filename, newName);
            setRename(false);
        }
        if (e.key == 'Esc') {
            setRename(false);
        }
    };

    const [isRenaming, setRename] = useState(false);
    const [newName, setName] = useState(file.filename);

    return (
        <div style={props.style}>
            <ListItem key={file.filename} role="listitem" button={file.isFolder as true}>
                <ListItemIcon>
                    {file.isFolder && <FolderIcon />}
                    {!file.isFolder && <InsertDriveFileIcon />}
                </ListItemIcon>
                {/* <Checkbox checked={false} onChange={handleClick} /> */}
                {!isRenaming && file.isFolder && <Link to={`${ClientRoutes.Index}${filepath}`}>{file.filename} </Link>}
                {!isRenaming && !file.isFolder && file.filename}
                {isRenaming && (
                    <Input onKeyPress={keyPress} onChange={(event) => setName(event.target.value)} value={newName} />
                )}
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
                    <MenuItem onClick={() => withClose(() => setRename(true))}>Rename</MenuItem>
                </Menu>
            </ListItem>
        </div>
    );
};
