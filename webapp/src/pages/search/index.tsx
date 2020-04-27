import React from 'react';
import Header from '@/components/Header';
import User from '@/components/User';
import Post from '@/components/Post';
import styles from './styles.less';

import { NavLink } from 'umi';
import BASE_URL from '../../endpoint';

import { green } from '@material-ui/core/colors';

import { makeStyles } from '@material-ui/core/styles';
import { 
  Card, 
  Dialog,
  DialogActions, 
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography, 
  Grid, 
  CardContent, 
  Button, 
  Avatar, 
  IconButton, 
  TextField, 
  InputLabel, 
  Input, 
  Container,
  CircularProgress
} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '23.5%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function OutlinedCard() {
  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [buscaInfo, setBuscaInfo] = React.useState({photo: "", name: ""});
  const [users, setUsers] = React.useState(Array<UserType>());
  const [posts, setPost] = React.useState(Array<PostType>());
  const [user, setUser] = React.useState("");
  const [buscar, setBuscar] = React.useState(true);
  const [click, setClick] = React.useState(false);

  const handleUserChange: (props: TextFieldProps) => void = (props: TextFieldProps) => {
    setUser(props.target.value);
  };

  const handleSubmit = async () => {
    if (!loading) {
      try {
        setSuccess(false);
        setLoading(true);
        const response = await fetch(`${BASE_URL}/user/search?q=${user}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })
    
        const res = await response.json();
    
        if (await response != undefined) {
          setSuccess(true);
          setLoading(false);

          setBuscar(true)
          setUsers(res)
        }
      } finally {
        setSuccess(true);
        setLoading(false);
        setClick(true)
      }
    }

  }
  const handleClose = () => {
    setClick(false);
  };
  const showProfile = async (id) => {
    const response = await fetch(`${BASE_URL}/user/${id}/posts`, {
      method: 'GET'
    })

    const res = await response.json();

    if (await response != undefined) {
      setBuscar(false)
 

      setPost(res)
    }

  }

  return (
    <Container className={styles.container} maxWidth="sm">
      <Header title='Instagram' />
      <Container className={styles.busca}>
      <Grid
        container
        direction="column"
        justify="center"
        spacing={3}

      >
        <Grid item>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h4" component="h4" align="center">
                Buscar Usuário
              </Typography>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <TextField id="standard-basic" label="Nome de usuário" disabled={loading} onChange={handleUserChange} onKeyPress={(target) => {if (target.charCode==13) handleSubmit()}}/>
                  </Grid>
                  <Grid item>
                    <div> 
                      <Button variant="contained" color="primary" size="small" disabled={loading} onClick={handleSubmit} onKeyPress={(target) => {if (target.charCode==13) handleSubmit()}}>Buscar</Button>
                      {loading && <CircularProgress size={24} className={classes.buttonProgress} />} 
                    </div>
                  </Grid>
                </Grid>
            </CardContent>            
          </Card>
        </Grid>
        { (buscar) &&
          users.map((post: UserType, i: number) => {
            return (
            <Grid item key={i} onClick={() => { showProfile(post.id); setBuscaInfo({ name: post.username, photo: post.profilePhoto})}}> 
              <User username={post.username} photo={post.profilePhoto}/> 
            </Grid>
            )
          })
        }
        {
          (!buscar) && posts.map((post: PostType, i: number) => {
            return (
            <Grid item key={i} > 
              <Post
                id={post.id} 
                likes={post.users} 
                description={post.description} 
                photo={post.s3Address} 
                name={buscaInfo.name} 
                profile={buscaInfo.photo} 
                userId={post.userId}
                refreshPost={handleSubmit}
              /> 
            </Grid>
            )})
        }
      </Grid>
      </Container>


      <Dialog
          open={buscar && users.length === 0 && click}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Alerta</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Nenhum Usuário encontrado
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
    </Container>
  );
}
