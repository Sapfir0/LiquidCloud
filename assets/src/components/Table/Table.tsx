import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Column, Index, Table, TableCellProps } from 'react-virtualized';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { ClientRoutes } from '../../services/clientRouteContants';
import { useInject } from '../../shared/hooks/injectHook';
import { TableFileStore } from './TableFileStore';

export const FileTable = observer(() => {
    const store = useInject<TableFileStore>(SERVICE_IDENTIFIER.TableFileStore);
    const rowGetter = ({ index }: Index) => {
        return store.files[index];
    };
    console.log('render table');

    const FileTypeCell = (props: TableCellProps) => (
        <div>{props.cellData ? <FolderIcon /> : <InsertDriveFileIcon />}</div>
    );

    const FilenameCell = (props: TableCellProps) => {
        const newDir = `${store.currentDirectory}/${props.cellData}`;
        return props.rowData.is_folder ? (
            <Link to={`${ClientRoutes.Index}${newDir}`}>{props.cellData} </Link>
        ) : (
            props.cellData
        );
    };

    const headerHeight = 50;
    const rowHeight = 40;
    const height = rowHeight * store.perPage + headerHeight;
    const rowCount = store.files.length;

    return (
        <Table
            height={height}
            rowHeight={rowHeight}
            headerHeight={headerHeight}
            rowCount={rowCount}
            width={600}
            scrollToIndex={store.scrollToIndex}
            rows={store.files}
            onRowsRendered={store.handleRowsScroll}
            rowGetter={rowGetter}
        >
            <Column label="" dataKey="is_folder" width={50} cellRenderer={FileTypeCell} />
            <Column label="Filename" dataKey="filename" width={250} cellRenderer={FilenameCell} />
        </Table>
    );
});
