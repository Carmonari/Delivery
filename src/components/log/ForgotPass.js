import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Dimensions, Image, ImageBackground} from 'react-native';
import {Link} from 'react-router-native';
import {connect} from 'react-redux';

import InputText from '../common/InputText';
import Boton from '../common/Boton';
import styles from './css';
import {forgotPass} from '../../actions/authActions';

const ForgotPass = props => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    props.errors;
  }, [props.errors]);

  const onChange = (name, value) => {
    setEmail(value);
  };

  const forgot = event => {
    const forget = {
      email,
    };
    console.warn(forget.email);
    props.forgotPass(forget, props.history);
  };

  const dimension = Dimensions.get('window');
  const imgWith = dimension.width;

  return (
    <ImageBackground
      source={require('../../../assets/background.png')}
      style={styles.imagenFondo}>
      <View style={styles.container}>
        <View style={styles.flex2}>
          <Image
            resizeMode="center"
            style={{width: imgWith}}
            source={require('../../../assets/orderit.png')}
          />
        </View>
        <View style={styles.flex1}>
          <InputText
            name="email"
            label={props.errors.email ? props.errors.email : 'Email'}
            value={email}
            onChange={onChange}
            placeholder="Email"
            error={props.errors.email && true}
          />
          <Boton
            style={styles.marginV}
            mode="contained"
            name="Enviar"
            onClick={forgot}
          />
          <Link to="/">
            <Boton
              mode="outline"
              name="Cancelar"
              textColor="#000"
              onClick={() => props.history.goBack()}
            />
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
};

ForgotPass.propTypes = {
  forgotPass: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors,
});

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, {forgotPass})(ForgotPass);
