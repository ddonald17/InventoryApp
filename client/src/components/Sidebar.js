import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { makeStyles } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '80px',
        height: '100vh',
        backgroundColor: '#10100f',
    }
}))

 

function Sidebar() {
    const classes = useStyles();
    return (
        <div className={classes.sideMenu}>
            <div className="sidebar_logo">
                <h2>Logo</h2>

            </div>
            <div className='sidebar_icon'>
                <IconButton aria-label="" >
                   <Link to='/'>
                     <HomeIcon fontSize="large"/>
                   </Link>
                </IconButton>
                <IconButton aria-label="" >
                    <Link to='/addItems'>
                        <AddIcon fontSize="large"/>
                    </Link>
                </IconButton>
                <IconButton aria-label="" >
                    <Link to='/addTransaction'>
                        <ReceiptIcon fontSize="large"/> 
                    </Link>
                </IconButton>
            </div>

        </div>
    )
}

export default Sidebar
