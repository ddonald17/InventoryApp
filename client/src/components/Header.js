import React from 'react';
import { AppBar, Toolbar, Grid,  makeStyles, Typography, CssBaseline } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#00000',
        marginLeft: theme.spacing(10),

        
    },
    
}))

function Header() {
    const classes = useStyles();

    return (
       <AppBar position="static" className={classes.root}>
           <Toolbar>
               <Grid container alignItems="center">
                   <Grid item>
                       <Typography variant="h3" color="initial">DashBoard</Typography>
                   </Grid>
               </Grid>
           </Toolbar>
       </AppBar>

    )
}

export default Header
