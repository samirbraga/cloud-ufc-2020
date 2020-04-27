import React, { FunctionComponent } from 'react';
import {
  Collapse, 
  Dialog,
  DialogActions, 
  DialogContent,
  DialogContentText,
  DialogTitle,
  AppBar, 
  Toolbar, 
  Grid, IconButton, CardMedia, CardActions, CircularProgress, CardContent, CardHeader, Avatar, Card, Typography, Button, useScrollTrigger, Slide } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/menu';
import styles from './styles.css';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';

import { green } from '@material-ui/core/colors';

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
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '34%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }));

interface DateFormProps {
    start: (date: MaterialUiPickersDate) => void,
    end: (date: MaterialUiPickersDate) => void,
    selectedStart: String,
    selectedEnd: String,
    onSubmit: () => void,
    handleClose: () => void,
    loading: boolean,
    click: boolean
};

const DateForm: FunctionComponent<DateFormProps> = ({onSubmit, start, loading, click, end, selectedEnd, handleClose, selectedStart}) => {
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
                      disabled={loading}
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
                      disabled={loading}
                    />
                  </MuiPickersUtilsProvider>

              </Grid>
              </Grid>
              <Grid item>
                <Button variant="contained" disabled={loading} color="primary" size="small" onClick={() => onSubmit()} onKeyPress={(target) => {if (target.charCode==13) onSubmit()}}>Buscar</Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}  
              </Grid>
            </Grid>
            
        </CardContent>

        <Dialog
          open={click}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Erro</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Erro ao buscar postagens por data
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    );
}

export default DateForm;