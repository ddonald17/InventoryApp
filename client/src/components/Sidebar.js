import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { makeStyles } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';
import AirplayOutlinedIcon from '@material-ui/icons/AirplayOutlined';

const useStyles = makeStyles(theme => ({
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '80px',
        height: '100%',
        backgroundColor: '#10100f',
    },
    sideIcon:{
        display:"flex",
        alignItems:'center',
        justifyContent:'center',
        margin:20
    },
    icon:{
        display:"flex",
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column'
    }
}))

 

function Sidebar() {
    const classes = useStyles();
    return (
        <div className={classes.sideMenu}>
            <div className={classes.sideIcon}>
                <AirplayOutlinedIcon  fontSize="large" color="primary"  />
            </div>
            <div className={classes.icon}>
                <IconButton aria-label="" >
                   <Link to='/'>
                     <HomeIcon fontSize="large" color="primary"/>
                   </Link>
                </IconButton>
                <IconButton aria-label="" >
                    <Link to='/addItems'>
                        <AddIcon fontSize="large" color="primary"/>
                    </Link>
                </IconButton>
                <IconButton aria-label="" >
                    <Link to='/addTransaction'>
                        <ReceiptIcon fontSize="large" color="primary"/> 
                    </Link>
                </IconButton>
            </div>

        </div>
    )
}

export default Sidebar
