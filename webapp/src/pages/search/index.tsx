import React from 'react';
import Header from '@/components/Header';
import User from '@/components/User';
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

export default function OutlinedCard() {
  const classes = useStyles();

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
              <form noValidate autoComplete="off">
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <TextField id="standard-basic" label="Nome de usuário" />
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" size="small">Buscar</Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>            
          </Card>
        </Grid>

        <Grid item> <User/> </Grid>
        <Grid item> <User/> </Grid>
        <Grid item> <User/> </Grid>
        <Grid item> <User/> </Grid>
        <Grid item> <User/> </Grid>
        <Grid item> <User/> </Grid>
        <Grid item> <User/> </Grid>
        <Grid item> <User/> </Grid>
        <Grid item> <User/> </Grid>
      </Grid>
      </Container>

    </Container>
  );
}
