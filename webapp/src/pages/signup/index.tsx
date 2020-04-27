import React, { FunctionComponent, useEffect } from 'react';
import Header from '@/components/Header';
import styles from './styles.less';

import { green } from '@material-ui/core/colors';

import { NavLink, history } from 'umi';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Avatar, Dialog ,DialogActions ,  Grid,DialogContent ,DialogContentText ,DialogTitle , CardContent, CircularProgress, Button, IconButton, TextField, InputLabel, Input, Container } from '@material-ui/core'

import DateFnsUtils from '@date-io/date-fns';

import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import BASE_URL from '../../endpoint'

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '72.7%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

interface SignupProps {
  fromNotifications: boolean
};

const Signup: FunctionComponent<SignupProps> = ({ fromNotifications }) => {

  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [selectedFirstName, setSelectedFirstName] = React.useState("");
  const [selectedLastName, setSelectedLastName] = React.useState("");
  const [selectedEmail, setSelectedEmail] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState("");
  const [selectedPassword, setSelectedPassword] = React.useState("");
  const [selectedBirthdate, setSelectedBirthdate] = React.useState(new Date());
  const [selectedPhoto, setSelectedPhoto] = React.useState("");
  const [contentDialog, setContentDialog] = React.useState("");
  const [titleDialog, setTitleDialog] = React.useState("");
  const [photo, setPhoto] = React.useState("");


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

  const handlePhotoChange =  (event) => {
    setSelectedPhoto(event.target.files[0])
    var reader = new FileReader();
    reader.onload = function(e) {
      setPhoto(e.target.result)
    }
    reader.readAsDataURL(event.target.files[0])
  }

  const handleSubmit = async () => {
    if (!loading) {
      try {
        setSuccess(false);
        setLoading(true);
  
        const form = new FormData()
        form.append('username', selectedUser)
        form.append('password', selectedPassword)
        form.append('email', selectedEmail)
        form.append('birthdate', selectedBirthdate.toISOString())
        form.append('firstName', selectedFirstName)
        form.append('lastName', selectedLastName)
        form.append('profilePhoto', selectedPhoto)
    
    
        const response = await fetch(`${BASE_URL}/user/signup`, {
          method: 'POST',
          body: form
          
        })
    
        const user = await response.json();
    
        if (await response != undefined) {
          setSuccess(true);
          setLoading(false);

          setTitleDialog("Sucesso")
          setContentDialog("Usuário cadastrado com sucesso")
  
        } else {
          setSuccess(true);
          setLoading(false);

          setTitleDialog("Erro")
          setContentDialog("Erro ao cadastrar usuário")
        }

      } catch {
        setSuccess(true);
        setLoading(false);

        setTitleDialog("Erro")
        setContentDialog("Erro ao cadastrar usuário")
      }

    }
  };
  const handleLogin = () => {
    history.push({
      pathname: '/'
      
    });
  };

  const handleClose = () => {
    setSuccess(false);
    setLoading(false);
  };
  return (
    <Container className={styles.container} maxWidth="sm">
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
                Instagram
              </Typography>
              <Typography variant="subtitle1" component="h6" align="center">
                Cadastre-se para ver fotos e vídeos dos seus amigos
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
                    <TextField id="standard-basic1" label="E-mail"onChange={handleEmailChange} type="email"/>
                  </Grid>
                  <Grid item>
                    <TextField id="standard-basic2" label="Nome" onChange={handleFirstNameChange} type="firstname"/>
                  </Grid>
                  <Grid item>
                    <TextField fullWidth id="standard-basic3" label="Sobrenome" onChange={handleLastNameChange} type="lastname"/>
                  </Grid>
                  <Grid item>
                    <TextField id="standard-basic4 " label="Nome de usuário" onChange={handleUserChange} type="username"/>
                  </Grid>
                  <Grid item>
                    <TextField
                      id="standard-password-input"
                      label="Senha"
                      type="password"
                      autoComplete="current-password"
                      onChange={handlePasswordChange}
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
                    <input accept="image/*" className={styles.input} id="icon-button-file" type="file" onChange={handlePhotoChange}/>
                    <label htmlFor="icon-button-file">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <Avatar aria-label="avatar" src={photo} />
                      </IconButton>
                    </label>
                  </Grid>
                  <Grid item>
                    <div>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        size="small" 
                        onClick={handleSubmit}
                        disabled={loading}
                        onKeyPress={(target) => {if (target.charCode==13) handleSubmit()}}
                      >Cadastre-se</Button>
                      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}  
                    </div>
                  </Grid>
                </Grid>
              </form>
            </CardContent>            
          </Card>
        </Grid>

        <Grid item>
          <Card variant="outlined">
            <CardContent>
              <form noValidate autoComplete="off">
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={2}
                >
                  <InputLabel>Tem uma conta?</InputLabel>
                  <Button size="small" color="primary" onKeyPress={(target) => {if (target.charCode==13) history.push({pathname: '/' })}}><NavLink to="/">Conecte-se</NavLink></Button>
                </Grid>
              </form>
            </CardContent>
            
          </Card>
        </Grid>
      </Grid>

      <Dialog
          open={success}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{titleDialog}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {contentDialog}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Fechar
            </Button>
            <Button onClick={handleLogin} color="primary" autoFocus>
              Login
            </Button>
          </DialogActions>
        </Dialog>
    </Container>
  );
}

export default Signup