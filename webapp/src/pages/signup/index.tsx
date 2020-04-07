import React, { FunctionComponent } from 'react';
import Header from '@/components/Header';
import styles from './styles.less';

import { NavLink } from 'umi';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Grid, CardContent, Button, IconButton, TextField, InputLabel, Input, Container, TextFieldProps } from '@material-ui/core'

import DateFnsUtils from '@date-io/date-fns';

import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import BASE_URL from '../../endpoint'

const Signup: FunctionComponent = () => {
  
  const [selectedFirstName, setSelectedFirstName] = React.useState("");
  const [selectedLastName, setSelectedLastName] = React.useState("");
  const [selectedEmail, setSelectedEmail] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState("");
  const [selectedPassword, setSelectedPassword] = React.useState("");
  const [selectedBirthdate, setSelectedBirthdate] = React.useState(new Date());
  const [selectedPhoto, setSelectedPhoto] = React.useState("");


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
    if ( date )
    setSelectedBirthdate(new Date(date.toISOString()));
  };

  const handlePhotoChange =  (event) => {
    setSelectedPhoto(event.target.files[0])
  }

  function calculateAge(birthday: Date) { 
    var ageDifMs = Date.now() -birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
  }

  const handleSubmit = async () => {
    const form = new FormData()
    form.append('username', selectedUser)
    form.append('password', selectedPassword)
    form.append('email', selectedEmail)
    form.append('age',  calculateAge(selectedBirthdate))
    form.append('birthdate', selectedBirthdate.toISOString())
    form.append('firstName', selectedFirstName)
    form.append('lastname', selectedLastName)
    form.append('profilePhoto', selectedPhoto)


    const response = await fetch(`${BASE_URL}/user/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: form
      
    })

    const user = await response.json();

    if (await response != undefined) {
      console.log(user)
    }
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
                    <TextField id="standard-basic" label="E-mail"onChange={handleEmailChange} />
                  </Grid>
                  <Grid item>
                    <TextField id="standard-basic" label="Nome" onChange={handleFirstNameChange}/>
                  </Grid>
                  <Grid item>
                    <TextField fullWidth id="standard-basic" label="Sobrenome" onChange={handleLastNameChange}/>
                  </Grid>
                  <Grid item>
                    <TextField id="standard-basic" label="Nome de usuário" onChange={handleUserChange}/>
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
                        format="MM/dd/yyyy"
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
                        <PhotoCamera />
                      </IconButton>
                    </label>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" size="small" onClick={handleSubmit}>Cadastre-se</Button>
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
                  <Button size="small" color="primary"><NavLink to="/">Conecte-se</NavLink></Button>
                </Grid>
              </form>
            </CardContent>
            
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Signup