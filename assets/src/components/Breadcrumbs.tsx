import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link, { LinkProps } from '@material-ui/core/Link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Route } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            width: 360,
        },
        lists: {
            backgroundColor: theme.palette.background.paper,
            marginTop: theme.spacing(1),
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }),
);

interface LinkRouterProps extends LinkProps {
    to: string;
    replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => <Link {...props} component={RouterLink as any} />;

export default function RouterBreadcrumbs() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Route>
                {({ location }) => {
                    const pathnames = location.pathname.split('/').filter((x) => x);

                    return (
                        <Breadcrumbs aria-label="breadcrumb">
                            {pathnames.map((value, index) => {
                                const last = index === pathnames.length - 1;
                                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                                return last ? (
                                    <Typography color="textPrimary" key={to}>
                                        {value}
                                    </Typography>
                                ) : (
                                    <LinkRouter color="inherit" to={to} key={to}>
                                        {value}
                                    </LinkRouter>
                                );
                            })}
                        </Breadcrumbs>
                    );
                }}
            </Route>
        </div>
    );
}
