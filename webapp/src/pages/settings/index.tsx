import React, {FunctionComponent} from 'react';
import Header from '@/components/Header';
import styles from './styles.less';

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
  Container 
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
}));

const Settings: FunctionComponent = () => {
  const classes = useStyles();

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
                    <input accept="image/*" className={styles.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <Avatar className={classes.large}>R</Avatar>
                      </IconButton>
                    </label>
                  </Grid>
                  <Grid item>
                    <TextField id="standard-basic" label="E-mail" />
                  </Grid>
                  <Grid item>
                    <TextField id="standard-basic" label="Nome Completo" />
                  </Grid>
                  <Grid item>
                    <TextField id="standard-basic" label="Nome de usuário" />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="standard-password-input"
                      label="Senha"
                      type="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" size="small">Modificar</Button>
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

export default Settings ;
