import React from 'react';
import { AppBar, Toolbar, Grid,  makeStyles, Typography, CssBaseline } from '@material-ui/core'

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
                       <Typography variant="h5" color="initial">Hello Vishal!!!</Typography>
                   </Grid>
               </Grid>
           </Toolbar>
       </AppBar>

    )
}

export default Header
