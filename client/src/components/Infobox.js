import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from "@material-ui/core";




const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      width:'250px',
      justifyContent:'space-between'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
      },
     content: {
        
      }, 
      icon:{
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          padding:20,
      }

  }));

function Infobox({title ,value, icon}) {
    
    const classes = useStyles();

    return (
            <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography variant="h6" color="initial">
                            {title}
                        </Typography>
                        <Typography variant='h5' color="initial">
                             {value}
                        </Typography>
                    </CardContent>
                </div>

                <div className={classes.icon}>
                    {icon}
                </div>

            </Card>            
    )
}

export default Infobox
