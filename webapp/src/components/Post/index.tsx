import React, { FunctionComponent, useEffect } from 'react';
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
    username: string,
    profile: string,
    id: number,
    userId: number,
    likes: any[]
};

const Post: FunctionComponent<PostProps> = ({ likes, photo, description, name, profile, username, id, userId } ) => {
  const trigger = useScrollTrigger({ target: window });
  const [getInfo, setGetInfo] = React.useState(true)

  const classes = useStyles();
  const [token, setToken] = React.useState({id: 0, token: localStorage.getItem("token"), userId: localStorage.getItem("userId")});
  const [liked, setLiked] = React.useState(likes?.some(like => like.id === parseInt(token.userId)))
  const [user, setUser] = React.useState({name: "", username: "", photo: ""})
  
  const getUser = async () => {
    const response = await fetch(`${BASE_URL}/user/${userId}`, {
      method: 'GET'
    })

    const res = await response.json();

    if (await response != undefined) {
      setUser({name: `${res.firstName} ${res.lastName}`, username: res.username, photo: res.profilePhoto})
    }
  }

  useEffect(() => {
    if(getInfo) {
      setGetInfo(false)
      getUser()
    }
  }, [])

  const handleSubmit = async () => {
      try {
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")
        myHeaders.append("Authorization", `Bearer ${token.token}`);

        const response = await fetch(`${BASE_URL}/posts/${id}/likes`, {
          method: 'POST',
          body: JSON.stringify ({
            like: !liked,
          }),
          headers: myHeaders
        })
        setLiked(!liked)
    
        if (await response != undefined) {
  
        }

      } finally {
        
      }


  };
    return (
        <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="profile ophoto" src={user.photo} />
          }
          title={`${user.name} (${user.username})`}
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
            <FavoriteIcon color={liked ? 'secondary' : 'inherit'}/>
          </IconButton>
          <Typography  variant="subtitle1" color="textSecondary" component="p">{likes?.length + (liked ? 1 : 0)}</Typography>
        </CardActions>
      </Card>
    );
}

export default Post;