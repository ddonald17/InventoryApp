import React, { useState } from 'react';
import { Avatar,  Paper, Grid, Typography, Container, makeStyles } from '@material-ui/core';
import LockOutlineIcon from "@material-ui/icons/LockOpenOutlined"
import Controls from './controls/Controls';


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
      },
      root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
        },
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', 
        marginTop: theme.spacing(3),
      },
      submit: {
       margin: theme.spacing(3, 0, 2),
      },
    
  }));

  const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };


function Auth() {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);

    const isSignup = false;

    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = () => {

    };

    const handleChange =() => {

    };
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlineIcon />
                </Avatar>
                <Typography variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
       
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Grid item xs={12}>
                                    <Controls.Input 
                                     name="firstName"
                                     label="First Name"
                                     onChange={handleChange}
                                     autofocus
                                     />
                                 </Grid>
                                 <Grid item xs={12}>
                                    <Controls.Input 
                                     name="lastName"
                                     label="Last Name"
                                     onChange={handleChange}
                                     autofocus
                                     />
                                 </Grid>
                            </>
                        )}

                     <Grid item xs={12}>
                            <Controls.Input 
                                name="email"
                                label="Email"
                                onChange={handleChange}
                                type = "email"
                            />
                       </Grid>
                       <Grid item xs={12}>
                            <Controls.Input 
                                name="password"
                                label="Password"
                                onChange={handleChange}
                                handleShowPassword = {handleShowPassword}
                                autofocus
                            />
                       </Grid>
                       {isSignup &&
                       <Grid item xs={12} >
                          <Controls.Input
                           name="confirmPassword" 
                           label="Confirm Password"
                           handleChange={handleChange} 
                           type={showPassword ?'text': 'password'}
                           handleShowPassword={handleShowPassword}
                           /> 
                       </Grid>
                       }
                        <Controls.Button className = {classes.submit} text={isSignup ? 'Sign Up' : 'Sign In'}/>
                           
                         <Grid container justify="flex-start"> 
                            <Grid item>
                                <Controls.Button text= { isSignup ? 'Already have an account? Sign in' : 'Dont have an account ? Sign Up' } variant='text' />
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
