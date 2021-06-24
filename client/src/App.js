import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/home/Home';
import AddTransaction from './pages/AddTransaction/AddTransaction';
import AddItems from './pages/AddItem/AddItems';
import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {getProducts} from './actions/products';
import {getTransactions} from './actions/transactions';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '80px',
    width: '100%',
  }
})


function App() {

  const classes = useStyles();
  const dispatch =useDispatch();

  useEffect(()=>{
    dispatch(getProducts());
  },[dispatch]);

  

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Sidebar />

        <div className={classes.appMain}>
        <Header />

          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/AddItems' exact component={AddItems} />
            <Route path='/AddTransaction' exact component={AddTransaction} />
          </Switch>
        </div>
      <CssBaseline />
      </ThemeProvider>
    </Router>
  );
}

export default App;
