import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import container from "../../inversify/inversifyContainer"
import { SERVICE_IDENTIFIER } from "../../inversify/inversifyTypes"
import { FilesListStore } from "./FilesListStore"
import { FileView } from "../../components/File/File"
import { Breadcrumbs, Grid, List } from "@material-ui/core"
import {useParams, useLocation} from "react-router-dom";
import { useInject } from "../../shared/hooks/injectHook"



export const FilesList = observer((props) => {
  const filesListStore = useInject<FilesListStore>(SERVICE_IDENTIFIER.FilesListStore)

  // useEffect(() => {
  //   const location = useLocation()
  //   filesListStore.setCurrentDirectory(location.pathname)
  // }, [])

    return <>
      <List dense role="list">
      {filesListStore.files.map(el => <FileView file={el} />)}
    </List>

    </>
}  )


