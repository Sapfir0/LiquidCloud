import { observer } from 'mobx-react';
import React from 'react';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { useInject } from '../../shared/hooks/injectHook';
import { InputField } from '../InputField';
import { SearchButton } from '../SearchButton';
import { SearchStore } from './SearchStore';

export type SearchProps = {
    currentDirectory: string;
    style?: React.CSSProperties;
};

export const Search = observer((props: SearchProps) => {
    const searchStore = useInject<SearchStore>(SERVICE_IDENTIFIER.SearchStore);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value, props.currentDirectory);
        searchStore.search(event.target.value, props.currentDirectory);
    };

    const ActiveSearch = () => {
        return <InputField style={props.style} onClose={() => searchStore.setDisabled()} onChange={onChange} />;
    };

    const DisabledSearch = () => {
        return <SearchButton style={props.style} onClick={() => searchStore.setActive()} />;
    };

    if (searchStore.isActive) {
        return <ActiveSearch />;
    }

    return <DisabledSearch />;
});
