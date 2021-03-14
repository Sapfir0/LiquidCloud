import { DataGrid, GridColDef, ValueFormatterParams } from '@material-ui/data-grid';
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { useInject } from '../../shared/hooks/injectHook';
import { FilesListStore } from './FileListStore';

export const FilesList: FC = observer((props) => {
    const filesListStore = useInject<FilesListStore>(SERVICE_IDENTIFIER.FilesListStore);
    const rows = filesListStore.files.map((el) => ({ ...el, id: el.path, size: el.info.size }));
    const columns: GridColDef[] = [
        {
            field: 'isFolder',
            headerName: '',
            valueFormatter: (props: ValueFormatterParams) => (props.value ? <FolderIcon /> : <InsertDriveFileIcon />),
        },
        {
            field: 'filename',
            headerName: 'Filename',
            width: 130,
        },
        { field: 'size', headerName: 'Size', width: 130 },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
        </div>
    );
});
