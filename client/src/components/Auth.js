import React, { useState } from 'react';
import { Avatar,  Paper, Grid, Typography, Container, makeStyles, Button } from '@material-ui/core';
import LockOutlineIcon from "@material-ui/icons/LockOpenOutlined"
import Controls from './controls/Controls';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../actions/auth';
import { useDispatch } from 'react-redux';


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
    const [form, setForm] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState();
    const dispatch = useDispatch();
    const history = useHistory();


    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form)
        if(isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }

    };

    const handleChange =(e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
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
                                <Grid item xs={12} >
                                    <Controls.Input 
                                     name="firstName"
                                     label="First Name"
                                     onChange={handleChange}
                                     autoFocus
                                     />
                                 </Grid>
                                 <Grid item xs={12}>
                                    <Controls.Input 
                                     name="lastName"
                                     label="Last Name"
                                     onChange={handleChange}
                                     autoFocus
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
                                type={showPassword ? 'text' : 'password'}
                                handleShowPassword = {handleShowPassword}
                                autoFocus
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
                        <Controls.Button className = {classes.submit} 
                        text={isSignup ? 'Sign Up' : 'Sign In'}
                        type='submit'/>
                           
                         <Grid container justify="flex-end"> 
                            <Grid item>
                            <Button onClick={switchMode}>
                               { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                            </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
