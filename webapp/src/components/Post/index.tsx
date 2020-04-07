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
      minWidth: 500,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },

  }));

interface PostProps {
    photo: string,
    description: string,
    name: string,
    profile: string
};

const Post: FunctionComponent<PostProps> = ( { photo, description, name, profile } ) => {
  const trigger = useScrollTrigger({ target: window });
  const classes = useStyles();

    return (
        <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="profile ophoto" src={profile} />
          }
          title={name}
        />
        <CardMedia
          className={classes.media}
          image={photo}
          title="post"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
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