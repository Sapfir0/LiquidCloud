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
import './FileView.css';
import { FileViewStore } from './FIleViewStore';

export type FileViewProps = {
    file: definitions['File'];
    style?: React.CSSProperties;
};

export const FileView: FC<FileViewProps> = observer((props: FileViewProps) => {
    const { file } = props;
    const fileListStore = useInject<FilesListStore>(SERVICE_IDENTIFIER.FilesListStore);
    const filepath = `${fileListStore.currentDirectory}/${file.filename}`;
    const { isRenaming, keyPress, anchorEl, newName, handleClick, withClose, setName, setRename } = useInject<FileViewStore>(SERVICE_IDENTIFIER.FileViewStore);

    return (
        <div style={props.style}>
            <ListItem key={file.filename} role="listitem" button={(file.is_folder as unknown) as true}>
                <ListItemIcon>
                    {file.is_folder && <FolderIcon />}
                    {!file.is_folder && <InsertDriveFileIcon />}
                </ListItemIcon>

                {!isRenaming && file.is_folder && <Link to={`${ClientRoutes.Index}${filepath}`}>{file.filename} </Link>}
                {!isRenaming && !file.is_folder && file.filename}
                {isRenaming && (
                    <Input
                        onKeyPress={keyPress(file)}
                        onChange={(event) => setName(event.target.value)}
                        value={newName}
                    />
                )}
                <IconButton onClick={handleClick}>
                    <MoreHorizIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} onClose={() => withClose()} open={!!anchorEl}>
                    <MenuItem>
                        <a
                            style={{ color: mainColor[900] }}
                            className="menu__download-link"
                            href={`${API_URL}${ApiRoutes.FILE.GET_FILE(filepath)}`}
                            download={file.filename}
                        >
                            Download
                        </a>
                    </MenuItem>
                    <MenuItem onClick={() => withClose(() => fileListStore.removeFile(filepath))}>Remove</MenuItem>
                    <MenuItem onClick={() => withClose(() => setRename(true))}>Rename</MenuItem>
                </Menu>
            </ListItem>
        </div>
    );
});
