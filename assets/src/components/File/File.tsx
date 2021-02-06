import { Card, Grid, ListItem, ListItemIcon, Paper } from "@material-ui/core"
import React, { FC } from "react"
import {FileViewDTO} from "../../shared/types/DTO"
import "./FileView.css"
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

export type FileViewProps = {
  file: FileViewDTO
}

export const FileView: FC<FileViewProps> = (props) => {
  return <> <ListItem key={props.file.path} role='listitem' button={props.file.isFolder}>
    <ListItemIcon>
      {props.file.isFolder && <FolderIcon/>}
      {!props.file.isFolder && <InsertDriveFileIcon />}
    </ListItemIcon>
    {props.file.path}
    </ListItem>   </>
}
