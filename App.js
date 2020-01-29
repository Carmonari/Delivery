import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {NativeRouter as Router, Route, Switch} from 'react-router-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import jwt_decode from 'jwt-decode';
import {Provider} from 'react-redux';
import PrivateRoute from './src/components/common/PrivateRoute';
import store from './store';
import setAuthToken from './src/utils/setAuthToken';
import {setCurrentUser} from './src/actions/authActions';

import Login from './src/components/log/Login';
import ForgotPass from './src/components/log/ForgotPass';
import Home from './src/components/home/Home';
import Tracking from './src/components/tracking/Tracking';
import PerfilInfo from './src/components/perfil/PerfilInfo';
import Perfil from './src/components/perfil/Perfil';
import Password from './src/components/perfil/Password';

//Check for token
AsyncStorage.getItem('jwtToken').then(token => {
  if (token) {
    setAuthToken(token);
    const decode = jwt_decode(token);
    //Set user and isAuthenticated
    store.dispatch(setCurrentUser(decode));
  }
});

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#41CE6C',
    background: '#F3F0EC',
  },
};

const App = props => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/forgot" component={ForgotPass} />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/perfil-info" component={PerfilInfo} />
            <PrivateRoute exact path="/perfil" component={Perfil} />
            <PrivateRoute exact path="/password" component={Password} />
            <PrivateRoute exact path="/tracking" component={Tracking} />
          </Switch>
        </Router>
      </PaperProvider>
    </Provider>
  );
};

export default App;
