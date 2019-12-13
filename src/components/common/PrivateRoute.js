import React from 'react';
import {Route, Redirect} from 'react-router-native';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';

const PrivateRoute = ({
  component: Component,
  auth,
  numberItems = 0,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} numberItems={numberItems} {...rest} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
