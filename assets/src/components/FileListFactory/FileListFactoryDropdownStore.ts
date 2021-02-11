import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';

export enum FileListViewDropdownEnum {
    List,
    Tree,
}

@injectable()
export class FileListDropdownStore {
    public currentItem: FileListViewDropdownEnum = FileListViewDropdownEnum.Tree;

    constructor() {
        makeObservable(this, { currentItem: observable, setCurrentItem: action });
    }

    setCurrentItem = (event: React.ChangeEvent<{ value: string }>): void => {
        this.currentItem = (event.target.value as unknown) as FileListViewDropdownEnum;
    };
}
