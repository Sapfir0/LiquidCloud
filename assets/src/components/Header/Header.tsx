import * as React from 'react';
import './Header.css';
import {FilterDrama} from "@material-ui/icons"

const Header: React.FC = () => (
    <header className="header">
        <div className="header_inner flex alignCenter space_between_inner">

        <div className="logo">
            <FilterDrama htmlColor="#9753C0" className="logo__image" />
            <div className="logo__title">
                Liquid Cloud
            </div>
        </div>
        </div>
        <hr />
    </header>
);

export default Header;
