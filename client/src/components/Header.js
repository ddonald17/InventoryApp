import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Grid,  makeStyles, Typography, Avatar } from '@material-ui/core'
import Contols from './controls/Controls';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#00000',
    },
    
}))

function Header() {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    const logout = () => {
        dispatch({type: 'LOGOUT'});
        history.push('/');
        setUser(null);
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
        setAnchorEl(null);
    },[location])

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
                   {user?.result ? (
                        <div className={classes.profile}>
                             <IconButton 
                             onClick={handleMenu}>
                                 <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={logout}>Logout</MenuItem>
                            </Menu>
                        </div>
                        ) :  (  <Contols.Button component={Link} to='/Auth' text='Sign in' /> )}
               </Grid>
               </Grid>
           </Toolbar>
       </AppBar>
    )
}

export default Header
