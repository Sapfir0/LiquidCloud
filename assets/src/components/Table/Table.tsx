import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Column, Table, TableCellProps } from 'react-virtualized';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { ClientRoutes } from '../../services/clientRouteContants';
import { useInject } from '../../shared/hooks/injectHook';
import { FilesListFactoryStore } from '../FileListFactory/FilesListFactoryStore';

export const FileTable = observer(() => {
    const filesListStore = useInject<FilesListFactoryStore>(SERVICE_IDENTIFIER.FilesListStore);
    const rowGetter = ({ index }) => {
        return filesListStore.files[index];
    };

    const handleRowsScroll = ({ stopIndex }) => {
        //   const page = Math.ceil(stopIndex / prevState.perPage)
        //   console.log(page);
    };

    const FileTypeCell = (props: TableCellProps) => (
        <div>{props.cellData ? <FolderIcon /> : <InsertDriveFileIcon />}</div>
    );

    const FilenameCell = (props: TableCellProps) => {
        const newDir = `${filesListStore.currentDirectory}/${props.cellData}`;
        return props.rowData.isFolder ? (
            <Link to={`${ClientRoutes.Index}${newDir}`}>{props.cellData} </Link>
        ) : (
            props.cellData
        );
    };

    return (
        <Table
            height={600}
            rowHeight={50}
            headerHeight={70}
            rowCount={filesListStore.files.length}
            width={600}
            rows={filesListStore.files}
            onRowsRendered={handleRowsScroll}
            rowGetter={rowGetter}
        >
            <Column label="" dataKey="isFolder" width={50} cellRenderer={FileTypeCell} />
            <Column label="Filename" dataKey="filename" width={250} cellRenderer={FilenameCell} />
        </Table>
    );
});
