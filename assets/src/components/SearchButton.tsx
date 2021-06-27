import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import React, { MouseEventHandler } from 'react';

export interface SearchButtonProps {
    onClick: MouseEventHandler;
    style?: React.CSSProperties;
}

export const SearchButton = (props: SearchButtonProps): React.ReactElement => {
    return (
        <IconButton style={props.style} onClick={props.onClick}>
            <SearchIcon />
        </IconButton>
    );
};
