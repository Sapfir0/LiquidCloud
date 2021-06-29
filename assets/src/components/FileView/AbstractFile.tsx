import { IconButton, Input, ListItem, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import mainColor from '@material-ui/core/colors/grey';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { ClientRoutes } from '../../services/clientRouteContants';
import { ApiRoutes, API_URL } from '../../services/serverRouteContants';
import { useInject } from '../../shared/hooks/injectHook';
import { definitions } from '../../shared/types/EndpointDescription';
import { FilesListStore } from '../FilesList/FileListStore';
import { FileViewStore } from './FileViewStore';

export type AbstractFileProps = {
    icon: JSX.Element;
    file: definitions['File'];
    nameIsLink: boolean;
    style?: React.CSSProperties;
};

export const AbstractFile = observer((props: AbstractFileProps) => {
    const { file } = props;
    const fileListStore = useInject<FilesListStore>(SERVICE_IDENTIFIER.FilesListStore);
    const filepath = `${fileListStore.currentDirectory}/${file.filename}`;
    const { isRenaming, keyPress, anchorEl, newName, handleClick, withClose, setName, setRename } =
        useInject<FileViewStore>(SERVICE_IDENTIFIER.FileViewStore);

    const nameOfElement = props.nameIsLink ? (
        <Link to={`${ClientRoutes.Index}${filepath}`}>{file.filename} </Link>
    ) : (
        file.filename
    );

    return (
        <div style={props.style}>
            <ListItem key={file.filename} role="listitem" button={file.is_folder as unknown as true}>
                <ListItemIcon>{props.icon}</ListItemIcon>

                {isRenaming ? (
                    <Input onKeyUp={keyPress(file)} onChange={(event) => setName(event.target.value)} value={newName} />
                ) : (
                    nameOfElement
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
                    <MenuItem onClick={() => withClose(() => setRename(file))}>Rename</MenuItem>
                </Menu>
            </ListItem>
        </div>
    );
});
