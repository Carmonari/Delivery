import React, {useState, useEffect} from 'react';
import {View, Text, Image, Dimensions, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import {Button} from 'react-native-paper';
import {Link} from 'react-router-native';

import InputText from '../common/InputText';
import Boton from '../common/Boton';
import styles from './css';

const Login = props => {
  const [data, setData] = useState({
    email: '',
    password: '',
    errors: {},
  });

  const {email, password, errors} = data;

  const onChange = (name, value) => {
    setData({
      [name]: value,
    });
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
            label="Email"
            value={email}
            onChange={onChange}
            placeholder="Email"
          />
          <InputText
            name="password"
            label="Password"
            value={password}
            onChange={onChange}
            placeholder="Password"
            password={true}
          />
          <Boton mode="contained" name="Login" />
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

// Login.propTypes = {

// }

export default Login;
