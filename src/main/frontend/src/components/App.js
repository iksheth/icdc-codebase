import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themes, { overrides } from '../themes';
import Layout from './Layout/LayoutView';
const theme = createMuiTheme({...themes.default, ...overrides});

// This is the place to check login ref to https://medium.com/@tomlarge/private-routes-with-react-router-dom-28e9f40c7146 for sample code

const App = () => (
    <MuiThemeProvider theme={theme}>
      {/* Reminder: Ajay need to replace the ICDC with env variable and change build npm to read env variable*/}
      <BrowserRouter basename='/ICDC'>
      <Switch>
        <Route path="/" component={Layout} />
        {/* <Route component={Error} /> */}
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>
);

export default App;