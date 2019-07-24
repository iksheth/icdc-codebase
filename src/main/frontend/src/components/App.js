import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themes, { overrides } from '../themes';
import Layout from './Layout/LayoutView';
const lightTheme = createMuiTheme({...themes.light, ...overrides});
const darkTheme = createMuiTheme({...themes.dark, ...overrides});

// This is the place to check login ref to https://medium.com/@tomlarge/private-routes-with-react-router-dom-28e9f40c7146 for sample code

const App = () => {
  return(
    <MuiThemeProvider theme={localStorage.getItem('isDarkTheme')?darkTheme:lightTheme}>
      {/* Reminder: Ajay need to replace the ICDC with env variable and change build npm to read env variable*/}
      <BrowserRouter>
      <Switch>
        <Route path="/" component={Layout} />
        {/* <Route component={Error} /> */}
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>
  )
  };

export default App;