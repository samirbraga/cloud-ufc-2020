import React, { FunctionComponent } from 'react';
import styles from './styles.less';

import { NavLink } from 'umi';

import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Grid, CardContent, Button, TextField, InputLabel, Input, Container } from '@material-ui/core';

import BASE_URL from '../../endpoint';

const Signin: FunctionComponent = () => {

  const [selectedUser, setSelectedUser] = React.useState("");
  const [selectedPassword, setSelectedPassword] = React.useState("");

  const handleUserChange: (props: TextFieldProps) => void = (props: TextFieldProps) => {
    setSelectedUser(props.target.value);
  };
  const handlePasswordChange: (props: TextFieldProps) => void = (props: TextFieldProps) => {
    setSelectedPassword(props.target.value);
  };

  const handleSubmit = async () => {
    const response = await fetch(`${BASE_URL}/user/sigin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        username: selectedUser,
        dapassword: selectedPassword
      })
    })

    if (await response != undefined) {
      // FAZ ALGO

    }
  }

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
              <Typography variant="h4" component="h2" align="center">
                Instagram
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
                    <TextField id="standard-basic" label="Usuário" type="username" onChange={handleUserChange}/>
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
                    <Button variant="contained" color="primary" size="small"><NavLink to="/home">Entrar</NavLink></Button>
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
                  <InputLabel>Não tem uma conta?</InputLabel>
                  <Button size="small" color="primary" ><NavLink to={{pathname: "/signup", state: { fromNotifications: true }}} >Cadastre-se</NavLink></Button>
                </Grid>
              </form>
            </CardContent>
            
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Signin