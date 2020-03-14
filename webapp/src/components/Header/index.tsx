import React, { FunctionComponent } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, useScrollTrigger, Slide } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/menu';
import styles from './styles.css';

interface HeaderProps {
    title: string
};

const Header: FunctionComponent<HeaderProps> = ({ title }) => {
    const trigger = useScrollTrigger({ target: window });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            <AppBar elevation={0} position='fixed' >
                <Toolbar className={styles.headerRoot}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        {title}
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Slide>
    );
}

export default Header;