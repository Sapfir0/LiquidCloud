import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { definitions } from '../../shared/types/EndpointDescription';
import { AbstractFile } from './AbstractFile';
import './FileView.css';

export type FileViewProps = {
    file: definitions['File'];
    style?: React.CSSProperties;
};

export const FileView: FC<FileViewProps> = observer((props: FileViewProps) =>
    props.file.is_folder ? <Folder {...props} /> : <File {...props} />,
);

export const File = (props: FileViewProps): JSX.Element => (
    <AbstractFile icon={<InsertDriveFileIcon />} nameIsLink={false} {...props} />
);

export const Folder = (props: FileViewProps): JSX.Element => (
    <AbstractFile icon={<FolderIcon />} nameIsLink={true} {...props} />
);
