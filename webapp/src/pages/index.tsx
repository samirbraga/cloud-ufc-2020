import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '@/components/Header';
import styles from './index.less';

export default () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Header title='News' />
      </Grid>
    </div>
  );
}
