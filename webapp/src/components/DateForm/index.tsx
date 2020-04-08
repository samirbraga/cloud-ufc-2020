import React, { FunctionComponent } from 'react';
import {Collapse, AppBar, Toolbar, Grid, IconButton, CardMedia, CardActions, CardContent, CardHeader, Avatar, Card, Typography, Button, useScrollTrigger, Slide } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/menu';
import styles from './styles.css';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';

import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 500,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },

  }));

interface DateFormProps {
    start: (date: MaterialUiPickersDate) => void,
    end: (date: MaterialUiPickersDate) => void,
    selectedStart: Date,
    selectedEnd: Date,
    onSubmit: () => void
};

const DateForm: FunctionComponent<DateFormProps> = ({onSubmit, start, end, selectedEnd, selectedStart}) => {
  const classes = useStyles();
    
    return (
        <Card className={classes.root}>

        <CardContent>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Typography variant="h6" color="textSecondary" component="h2">Busca por data</Typography> 
            </Grid>
            <Grid item>
              <Grid container justify="space-around">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inlin1e"
                      label="Data inicial"
                      value={selectedStart}
                      onChange={start}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}

                    />
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Data final"
                      value={selectedEnd}
                      onChange={end}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>

              </Grid>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" size="small" onClick={() => onSubmit()}>Buscar</Button>
              </Grid>
            </Grid>
        </CardContent>
      </Card>
    );
}

export default DateForm;