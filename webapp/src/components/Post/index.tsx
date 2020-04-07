import React, { FunctionComponent } from 'react';
import {Collapse, AppBar, Toolbar, IconButton, CardMedia, CardActions, CardContent, CardHeader, Avatar, Card, Typography, Button, useScrollTrigger, Slide } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/menu';
import styles from './styles.css';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 500,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },

  }));

const Post: FunctionComponent = () => {
    const trigger = useScrollTrigger({ target: window });
  const classes = useStyles();

    return (
        <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" >R</Avatar>
          }
          title="Shrimp and Chorizo Paella"
        />
        <CardMedia
          className={classes.media}
          image="https://www.receiteria.com.br/wp-content/uploads/receitas-de-comida-mexicana-1-1.jpg"
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <Typography  variant="subtitle1" color="textSecondary" component="p">100</Typography>
        </CardActions>
      </Card>
    );
}

export default Post;