import React, { FC } from "react"
import {FileViewDTO} from "../../shared/types/DTO"


export type FileViewProps = {
  file: FileViewDTO
}

export const FileView: FC<FileViewProps> = (props) => {
  return <> {props.file.path} </>
}
