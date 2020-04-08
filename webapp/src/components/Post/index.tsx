import React, { FunctionComponent } from 'react';
import {Collapse, AppBar, Toolbar, IconButton, CardMedia, CardActions, CardContent, CardHeader, Avatar, Card, Typography, Button, useScrollTrigger, Slide } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/menu';
import styles from './styles.css';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import BASE_URL from '../../endpoint'

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
    profile: string,
    id: number,
    user_id: number
};

const Post: FunctionComponent<PostProps> = ( { photo, description, name, profile, id, user_id } ) => {
  const trigger = useScrollTrigger({ target: window });
  const classes = useStyles();
  const [token, setToken] = React.useState({id: 0, token: localStorage.getItem("token"), userId: localStorage.getItem("userId")});
  const [color, setColor] = React.useState("")

  const handleSubmit = async () => {
      try {
        setColor("secondary")
        var myHeaders = new Headers()
        myHeaders.append("Authorization", `Bearer ${token.token}`);

        const response = await fetch(`${BASE_URL}/${user_id}/likes/${id}`, {
          method: 'POST',
          body: JSON.stringify ({
            like: true,
          }),
          headers: myHeaders
          
        })
        const user = await response.json();
    
        if (await response != undefined) {
          console.log("deu certo")
  
        }

      } finally {
        
      }


  };
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
          <IconButton aria-label="add to favorites" onClick={handleSubmit}>
            <FavoriteIcon color={color}/>
          </IconButton>
          <Typography  variant="subtitle1" color="textSecondary" component="p">100</Typography>
        </CardActions>
      </Card>
    );
}

export default Post;