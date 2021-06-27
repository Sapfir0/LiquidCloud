import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';

export enum FileListViewDropdownEnum {
    List,
    Tree,
    Table,
}

@injectable()
export class FileListDropdownStore {
    public viewType: FileListViewDropdownEnum = FileListViewDropdownEnum.List;

    constructor() {
        makeObservable(this, { viewType: observable, setCurrentItem: action });
    }

    setCurrentItem = (event: React.ChangeEvent<{ value: unknown }>): void => {
        this.viewType = event.target.value as FileListViewDropdownEnum;
    };
}
