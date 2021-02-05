import React from "react"
import { observer } from "mobx-react"
import container from "../../inversify/inversifyContainer"
import { SERVICE_IDENTIFIER } from "../../inversify/inversifyTypes"
import { FilesListStore } from "./FilesListStore"


export const FilesList = observer((props) => {
  const filesListStore = container.get<FilesListStore>(SERVICE_IDENTIFIER.FilesListStore)
  filesListStore.getFiles()
    return <>
      FilesList
    </>
}  )
