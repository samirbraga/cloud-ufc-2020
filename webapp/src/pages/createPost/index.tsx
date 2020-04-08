import React, {FunctionComponent, useEffect} from 'react';
import Header from '@/components/Header';
import styles from './styles.less';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { green } from '@material-ui/core/colors';

import { NavLink } from 'umi';

import { makeStyles } from '@material-ui/core/styles';
import { 
  Card, 
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

import BASE_URL from '../../endpoint'


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
  }, buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '60%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));
interface CreateProps {
  token: TokenType
};

const Create: FunctionComponent<CreateProps> = ({ token }) => {
  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [tok, setToken] = React.useState({id: 0, token: "", userId: 0});

  const [selectedPhoto, setSelectedPhoto] = React.useState("");
  const [selectedDescription, setSelectedDescription] = React.useState("");
  
  const handleDescriptionChange: (props: TextFieldProps) => void = (props: TextFieldProps) => {
    setSelectedDescription(props.target.value);
  };

  const handlePhotoChange =  (event) => {
    setSelectedPhoto(event.target.files[0])
  }

  useEffect(() => {
    if(tok.token == "" && localStorage.hasOwnProperty('token') && localStorage.hasOwnProperty('userId')) {
      setToken({id: 0, token: localStorage.getItem("token"), userId: localStorage.getItem("userId")})
    }
  })

  const handleSubmit = async () => {
    if (!loading) {
      try {
        setSuccess(false);
        setLoading(true);
        console.log("veio aqui")

        var myHeaders = new Headers()
        myHeaders.append("Authorization", `Bearer ${tok.token}`);

        const form = new FormData()
        form.append('s3Address', selectedPhoto)
        form.append('publicationDate', new Date().toISOString())
        form.append('description', selectedDescription)
    
        console.log(selectedDescription)
        const response = await fetch(`${BASE_URL}/${tok.userId}/posts`, {
          method: 'POST',
          headers: myHeaders,
          body: form,
          redirect: 'follow'
          
        })
    
        const user = await response.json();
    
        if (await response != undefined) {
          setSuccess(true);
          setLoading(false);
          console.log(user)
  
        } else {
          setSuccess(true);
          setLoading(false);

        }

      } finally {
        setSuccess(true);
        setLoading(false);
      }

    }
  };

  return (
    <Container className={styles.container} maxWidth="sm">
      <Header token={token} title='Instagram' />

      <Grid
        container
        direction="column"
        justify="center"
        spacing={3}
        className={styles.container}
      >
        <Grid item>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h4" component="h4" align="center">
                Criar Postagem
              </Typography>
              <form noValidate autoComplete="off">
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  spacing={2}
                >
                  
                  <Grid item>
                    <input accept="image/*" className={styles.input} id="icon-button-file" type="file" onChange={handlePhotoChange}/>
                    <label htmlFor="icon-button-file">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                      </IconButton>
                    </label>
                  </Grid>

                  <Grid item>
                    <TextField id="standard-basic" label="Descrição" type="description" rows={4} multiline onChange={handleDescriptionChange}/>
                  </Grid>
                
                  <Grid item>
                    <Button variant="contained" color="primary" size="small" disabled={loading} onClick={handleSubmit}>Postar</Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}  
                  </Grid>
                </Grid>
              </form>
            </CardContent>            
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Create