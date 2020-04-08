import React, { FunctionComponent, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, useScrollTrigger, Slide, Grid, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/menu';
import styles from './styles.css';
import BASE_URL from '../../endpoint';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { NavLink } from 'umi';

interface HeaderProps {
    title: string
};

const Header: FunctionComponent<HeaderProps> = ({ title }) => {
    const trigger = useScrollTrigger({ target: window });
    const [user, setUser] = React.useState({name: "", photo: ""})
    const [token, setToken] = React.useState({id: 0, token: localStorage.getItem("token"), userId: localStorage.getItem("userId")});

    const getUser = async () => {
        const response = await fetch(`${BASE_URL}/user/${token.userId}`, {
          method: 'GET'
        })
    
        const res = await response.json();
    
        if (await response != undefined) {
          setUser({name: `${res.firstName} ${res.lastName}`, photo: res.profilePhoto})
        }
      }

      useEffect(() => {
          getUser()
      }, [])

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            <AppBar elevation={0} position='fixed' >
                <Toolbar className={styles.headerRoot}>
                    <Grid
                        container 
                        alignItems="center"
                        justify="center" 
                        spacing={8}
                    >
                        <Grid item>
                            <Button>
                                <NavLink className={styles.link} to="/home">
                                    {title}
                                </NavLink>
                            </Button>
                        </Grid>
                        <Grid item>
                            <NavLink to="/search" className={styles.link}>
                                <IconButton color="inherit" aria-label="busca"><SearchIcon/></IconButton>
                            </NavLink>
                        </Grid>
                        <Grid item>
                            <NavLink to={{pathname: "/create"}} className={styles.link}>
                                <IconButton color="inherit" aria-label="criar postagem"><AddCircleIcon/></IconButton>
                            </NavLink>
                        </Grid>
                        <Grid item>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <NavLink to="/settings"><Avatar aria-label="avatar" src={user.photo} /></NavLink>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Slide>
    );
}

export default Header;