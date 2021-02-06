import React from "react"
import { observer } from "mobx-react"
import container from "../../inversify/inversifyContainer"
import { SERVICE_IDENTIFIER } from "../../inversify/inversifyTypes"
import { FilesListStore } from "./FilesListStore"
import { FileView } from "../../components/File/File"
import { Grid, List } from "@material-ui/core"

const filesListStore = container.get<FilesListStore>(SERVICE_IDENTIFIER.FilesListStore)
filesListStore.getFiles()

export const FilesList = observer((props) => {
  console.log(filesListStore.files);

    return <>
      <List dense component="div" role="list">
      {filesListStore.files.map(el => <FileView file={el} />)}
    </List>

    </>
}  )


