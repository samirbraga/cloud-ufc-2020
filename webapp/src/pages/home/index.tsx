import React from 'react';
import Header from '@/components/Header';
import Post from '@/components/Post';
import DateForm from '@/components/DateForm';
import styles from './styles.less';

import { Grid, Avatar, IconButton, Container } from '@material-ui/core';

export default () => {
  return (

      <Grid>
        <Header title='Instagram' />
        <Container className={styles.styles}>
          <Grid 
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item><DateForm/></Grid>
            <Grid item><Post/></Grid>
            <Grid item><Post/></Grid>
            <Grid item><Post/></Grid>
            <Grid item><Post/></Grid>
          </Grid>
        </Container>
      </Grid>


  );
}
