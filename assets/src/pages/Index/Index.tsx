import React, { FC } from "react"
import { FilesList } from "../../components/FilesList/FilesList"
import container from "../../inversify/inversifyContainer"
import { SERVICE_IDENTIFIER } from "../../inversify/inversifyTypes"
import { useInject } from "../../shared/hooks/injectHook"
import { FilesListStore } from "../../components/FilesList/FilesListStore"

export const Index: FC = (props) => {

  return (<> <FilesList/></>)
}
