import { Card } from '@material-ui/core';
import React, { FC } from 'react';
import { Link, Route } from 'react-router-dom';
import { FilesList } from '../../components/FilesList/FilesList';
import './Index.css';
import Breadcrumbs from "../../components/Breadcrumbs"


export const Index: FC = (props) => {
    return (
        <>
            <Breadcrumbs/>

            <Card className="main">
                <FilesList />
            </Card>
        </>
    );
};
