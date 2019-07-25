import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './Layout/LayoutView';
import { CustomThemeProvider } from './ThemeContext';

const App = () => {
  return(
    <CustomThemeProvider>
      {/* Reminder: Ajay need to replace the ICDC with env variable and change build npm to read env variable*/}
      <BrowserRouter>
      <Switch>
        <Route path="/" component={Layout} />
        {/* <Route component={Error} /> */}
      </Switch>
    </BrowserRouter>
  </CustomThemeProvider>
  )
  };

export default App;