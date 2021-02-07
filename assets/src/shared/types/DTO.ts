export type FileViewDTO = {
  children: FileViewDTO[] | null
  isFolder: boolean
  filename: string
}
