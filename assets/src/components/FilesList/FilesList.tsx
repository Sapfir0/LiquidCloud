import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { List, ListRowProps } from 'react-virtualized';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { useInject } from '../../shared/hooks/injectHook';
import { FileView } from '../File/File';
import { FilesListStore } from './FileListStore';

export const FilesList: FC = observer((props) => {
    const filesListStore = useInject<FilesListStore>(SERVICE_IDENTIFIER.FilesListStore);
    const rowRenderer = (props: ListRowProps) => {
        return <FileView key={props.key} style={props.style} file={filesListStore.files[props.index]} />;
    };

    return (
        <>
            <List
                height={600}
                overscanRowCount={10}
                rowCount={filesListStore.files.length}
                rowHeight={50}
                rowRenderer={(props) => rowRenderer(props)}
                scrollToIndex={undefined}
                width={600}
            />
        </>
    );
});
