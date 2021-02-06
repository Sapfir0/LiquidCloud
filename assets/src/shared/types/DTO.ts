export type FileViewDTO = {
  children: FileViewDTO[] | null
  isFolder: boolean
  path: string
}
