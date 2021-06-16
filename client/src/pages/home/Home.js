import React from 'react';
import Infobox from '../../components/Infobox';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ShowChartIcon from '@material-ui/icons/ShowChart';




const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
   
  }));

function Home() {
    const classes = useStyles();

    return (

        <div className={classes.root}>
            <Grid container >
                <Grid item xs={4}>
                    <Infobox
                    title = 'Revenue'
                    value = '35000'
                    icon = {<ShowChartIcon />}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Infobox 
                    title = 'Profit'
                    value ='10000'
                    icon = {<ShowChartIcon />}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Infobox 
                    title = 'Orders'
                    value = '100'
                    icon = {<ShowChartIcon />}
                    />
                </Grid>
            </Grid>
            
        </div>
    )
}

export default Home
