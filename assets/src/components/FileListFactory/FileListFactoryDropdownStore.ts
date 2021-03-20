import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';

export enum FileListViewDropdownEnum {
    List,
    Tree,
    Table,
}

@injectable()
export class FileListDropdownStore {
    public currentItem: FileListViewDropdownEnum = FileListViewDropdownEnum.List;

    constructor() {
        makeObservable(this, { currentItem: observable, setCurrentItem: action });
    }

    setCurrentItem = (event: React.ChangeEvent<{ value: unknown }>): void => {
        this.currentItem = event.target.value as FileListViewDropdownEnum;
    };
}
