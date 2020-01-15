import React, {useState, useEffect} from 'react';
import {View, Text, Image, Dimensions, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-native';
import {connect} from 'react-redux';

import {loginUser} from '../../actions/authActions';

import InputText from '../common/InputText';
import Boton from '../common/Boton';
import styles from './css';

const Login = props => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  let {email, password} = data;

  useEffect(() => {
    props.errors;
  }, [props.errors]);

  if (props.auth.isAuthenticated) {
    return <Redirect to="/home" />;
  }

  const onChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleLogin = event => {
    const user = {
      email,
      password,
    };
    props.loginUser(user);
  };

  const dimensions = Dimensions.get('window');
  const imgWidth = dimensions.width * 0.95;

  return (
    <ImageBackground
      source={require('../../../assets/background.png')}
      style={styles.imagenFondo}>
      <View style={styles.container}>
        <View style={styles.flex2}>
          <Image
            resizeMode="center"
            style={{width: imgWidth}}
            source={require('../../../assets/orderit.png')}
          />
        </View>
        <View style={styles.form}>
          <InputText
            name="email"
            label={props.errors ? props.errors.email : 'Email'}
            value={email}
            onChange={onChange}
            placeholder="Email"
            error={props.errors.email && true}
          />
          <InputText
            name="password"
            label={props.errors ? props.errors.password : 'Password'}
            value={password}
            onChange={onChange}
            placeholder="Password"
            password={true}
            error={props.errors.password && true}
          />
          <Boton mode="contained" onClick={handleLogin} name="Login" />
        </View>
        <View style={styles.forgot}>
          <Link to="/forgot">
            <Text>¿Olvidaste la contraseña?</Text>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, {loginUser})(Login);
