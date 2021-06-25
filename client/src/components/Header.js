import React from 'react';
import { AppBar, Toolbar, Grid,  makeStyles, Typography, CssBaseline } from '@material-ui/core'
import Contols from './controls/Controls';
import { Link, useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#00000',
    },
    
}))

function Header() {
    const classes = useStyles();

    return (
       <AppBar position="static" className={classes.root}>
           <Toolbar>
               <Grid container alignItems="center">
                   <Grid item xs={6}>
                       <Typography variant="h5" color="initial">Home</Typography>
                   </Grid>
                   <Grid item xs={4}>

                   </Grid>
                    <Grid item>
                      <Contols.Button component={Link} to='/Auth' text='Sign in' />
                    </Grid>
               </Grid>
           </Toolbar>
       </AppBar>

    )
}

export default Header
