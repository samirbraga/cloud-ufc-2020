import React from 'react';
import Header from '@/components/Header';
import styles from './styles.less';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

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
                    <input accept="image/*" className={styles.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                      </IconButton>
                    </label>
                  </Grid>
                
                  <Grid item>
                    <Button variant="contained" color="primary" size="small">Postar</Button>
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
