import React, {FunctionComponent, useEffect} from 'react';
import Header from '@/components/Header';
import styles from './styles.less';
import BASE_URL from '../../endpoint';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import { NavLink, history } from 'umi';

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
import { green } from '@material-ui/core/colors';

import DateFnsUtils from '@date-io/date-fns';

import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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
    top: '60%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const Settings: FunctionComponent = () => {
  const classes = useStyles();
  const [getInfo, setGetInfo] = React.useState(true)
  const [token, setToken] = React.useState({id: 0, token: localStorage.getItem("token"), userId: localStorage.getItem("userId")});

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [selectedFirstName, setSelectedFirstName] = React.useState("");
  const [selectedLastName, setSelectedLastName] = React.useState("");
  const [selectedEmail, setSelectedEmail] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState("");
  const [selectedPassword, setSelectedPassword] = React.useState("");
  const [selectedBirthdate, setSelectedBirthdate] = React.useState(new Date());
  const [selectedPhoto, setSelectedPhoto] = React.useState("");

  const handlePhotoChange =  (event) => {
    setSelectedPhoto(event.target.files[0])
  }

  const handleEmailChange: (props: TextFieldProps) => void = (props: TextFieldProps) => {
    setSelectedEmail(props.target.value);
  };

  const handleFirstNameChange: (props: TextFieldProps) => void = (props: TextFieldProps) => {
    setSelectedFirstName(props.target.value);
  };

  const handleLastNameChange: (props: TextFieldProps) => void = (props: TextFieldProps) => {
    setSelectedLastName(props.target.value);
  };

  const handleUserChange: (props: TextFieldProps) => void = (props: TextFieldProps) => {
    setSelectedUser(props.target.value);
  };

  const handlePasswordChange: (props: TextFieldProps) => void = (props: TextFieldProps) => {
    setSelectedPassword(props.target.value);
  };

  const handleDateChange: (date: MaterialUiPickersDate) => void = (date: MaterialUiPickersDate) => {
    if (date) {
      if ( date.toString() !== "Invalid Date")
        setSelectedBirthdate(new Date(date.toISOString()));
      else setSelectedBirthdate(date);
    }
  };

  const handleSubmit = async () => {
    if (!loading) {
      try {
        setSuccess(false);
        setLoading(true);
  
        const form = new FormData()
        if (selectedUser)
          form.append('username', selectedUser)
        if (selectedPassword)
          form.append('password', selectedPassword)
        if (selectedEmail)
          form.append('email', selectedEmail)
        if (selectedBirthdate)
          form.append('birthdate', selectedBirthdate.toISOString())
        if (selectedFirstName)
          form.append('firstName', selectedFirstName)
        if (selectedLastName)
          form.append('lastName', selectedLastName)
        if (selectedPhoto)
          form.append('profilePhoto', selectedPhoto)

        var myHeaders = new Headers()
        myHeaders.append("Authorization", `Bearer ${token.token}`);
    
        const response = await fetch(`${BASE_URL}/user/${token.userId}`, {
          method: 'PUT',
          body: form,
          headers: myHeaders
        })
    
        if (await response != undefined) {
          setSuccess(true);
          setLoading(false);
  
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

  const getUser = async () => {
    const response = await fetch(`${BASE_URL}/user/${token.userId}`, {
      method: 'GET'
    })

    const res = await response.json();

    if (await response != undefined) {
      setSelectedFirstName(res.firstName)
      setSelectedLastName(res.lastName)
      setSelectedPassword(res.password)
      setSelectedPhoto(res.profilePhoto)
      setSelectedEmail(res.email)

      const date = res.birthdate.split("-")
      const new_date = `${date[1]}/${date[2]}/${date[0]}`

      setSelectedBirthdate(new Date(new_date))
      setSelectedUser(res.username)
    }
  }

  useEffect(() => {
    if(getInfo) {
      setGetInfo(false)
      getUser()
    }
  }, [])


  const handleSignout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    history.push({
      pathname: '/'
      
    });
  };

  return (
    <Container className={styles.container} maxWidth="sm">
      <Header title='Instagram' />

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
                Configurações
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
                    <TextField id="standard-basic1" label="E-mail"onChange={handleEmailChange} type="email" value={selectedEmail}/>
                  </Grid>
                  <Grid item>
                    <TextField id="standard-basic2" label="Nome" onChange={handleFirstNameChange} type="firstname" value={selectedFirstName}/>
                  </Grid>
                  <Grid item>
                    <TextField fullWidth id="standard-basic3" label="Sobrenome" onChange={handleLastNameChange} type="lastname" value={selectedLastName}/>
                  </Grid>
                  <Grid item>
                    <TextField id="standard-basic4 " label="Nome de usuário" onChange={handleUserChange} type="username" value={selectedUser}/>
                  </Grid>
                  <Grid item>
                    <TextField
                      id="standard-password-input"
                      label="Senha"
                      type="password"
                      autoComplete="current-password"
                      onChange={handlePasswordChange}
                      value={selectedPassword}
                    />
                  </Grid>
                  <Grid item>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Data de Nascimento"
                        value={selectedBirthdate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" size="small" onClick={handleSubmit} disabled={loading}>Modificar</Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}  
                  </Grid>
                </Grid>
              </form>
            </CardContent>            
          </Card>
        </Grid>

        <Grid item>
          <Card variant="outlined">
            <CardContent>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <Button variant="contained" color="secondary" size="small" onClick={handleSignout} disabled={loading}>Sair</Button>
                  </Grid>
                </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Settings ;
