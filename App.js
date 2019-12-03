import React from 'react';
import {NativeRouter as Router, Route, Switch} from 'react-router-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import jwt_decode from 'jwt-decode';
import {Provider} from 'react-redux';
import store from './store';

import Login from './src/components/log/Login';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#41CE6C',
    background: '#F3F0EC',
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
          </Switch>
        </Router>
      </PaperProvider>
    </Provider>
  );
};

export default App;
