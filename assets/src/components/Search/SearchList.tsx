import { observer } from 'mobx-react';
import React from 'react';
import { List, ListRowProps } from 'react-virtualized';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { useInject } from '../../shared/hooks/injectHook';
import { FileView } from '../FileView/FileView';
import { SearchStore } from './SearchStore';

export const SearchList = observer(() => {
    const searchStore = useInject<SearchStore>(SERVICE_IDENTIFIER.SearchStore);
    const rowRenderer = (props: ListRowProps) => {
        return <FileView key={props.key} style={props.style} file={searchStore.searchResult[props.index]} />;
    };

    return (
        <List
            height={600}
            overscanRowCount={10}
            rowCount={searchStore.searchResult.length}
            rowHeight={50}
            rowRenderer={(props) => rowRenderer(props)}
            scrollToIndex={undefined}
            width={600}
        />
    );
});
