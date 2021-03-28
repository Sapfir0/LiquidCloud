import { observer } from 'mobx-react';
import React from 'react';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { useInject } from '../../shared/hooks/injectHook';
import { InputField } from '../InputField';
import { SearchButton } from '../SearchButton';
import { SearchStore } from './SearchStore';

export type SearchProps = {
    currentDirectory: string;
};

export const Search = observer((props: SearchProps) => {
    const searchStore = useInject<SearchStore>(SERVICE_IDENTIFIER.SearchStore);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value, props.currentDirectory);
        searchStore.search(event.target.value, props.currentDirectory);
    };

    const ActiveSearch = () => {
        return <InputField onClose={() => searchStore.setActive(false)} onChange={onChange} />;
    };

    const DisabledSearch = () => {
        return <SearchButton onClick={() => searchStore.setActive(true)} />;
    };

    if (searchStore.isActive) {
        return <ActiveSearch />;
    }

    return <DisabledSearch />;
});
