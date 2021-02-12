import { MenuItem, Select } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { useInject } from '../../shared/hooks/injectHook';
import { FileListDropdownStore, FileListViewDropdownEnum } from './FileListFactoryDropdownStore';

export const FileListViewDropdown = observer(() => {
    const store = useInject<FileListDropdownStore>(SERVICE_IDENTIFIER.FileListDropdownStore);

    return (
        <Select value={store.currentItem} onChange={store.setCurrentItem}>
            <MenuItem value={FileListViewDropdownEnum.Tree}>SortableTree</MenuItem>
            <MenuItem value={FileListViewDropdownEnum.List}>List</MenuItem>
        </Select>
    );
});
