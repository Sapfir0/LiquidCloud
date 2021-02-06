import { Card, Grid, Paper } from "@material-ui/core"
import React, { FC } from "react"
import {FileViewDTO} from "../../shared/types/DTO"
import "./FileView.css"

export type FileViewProps = {
  file: FileViewDTO
}

export const FileView: FC<FileViewProps> = (props) => {
  return <> <Grid item={true} >
    <Paper className="fileView">{props.file.path}</Paper>
    </Grid>   </>
}
