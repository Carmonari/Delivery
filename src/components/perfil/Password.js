import React, {useState, useEffect} from 'react';
import {View, ImageBackground, BackHandler, Alert} from 'react-native';
import PropTypes from 'prop-types';
import SideDrawer from '../common/SideDrawer';
import InputText from '../common/InputText';
import styles from '../common/css';
import Boton from '../common/Boton';
import {changePass} from '../../actions/usersActions';
import {connect} from 'react-redux';

const Password = props => {
  const [data, setData] = useState({
    _id: '',
    password: '',
    password2: '',
  });

  useEffect(() => {
    setData({
      ...data,
      _id: props.auth.user.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.auth.user.id]);

  useEffect(() => {
    const handleValidateClose = () => {
      props.history.goBack();
      return true;
    };

    const handler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleValidateClose,
    );
    return () => handler.remove();
  });

  const onChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const guardar = () => {
    if (data.password === data.password2) {
      let pass = {
        password: data.password,
      };
      props.changePass(data._id, pass, props.history);
    } else {
      Alert.alert('No coinciden los passwords');
    }
  };

  return (
    <SideDrawer>
      <ImageBackground
        source={require('../../../assets/background.png')}
        style={styles.imagenFondo}>
        <View style={styles.flex1}>
          <View style={styles.margen20}>
            <InputText
              label="Nuevo password"
              value={data.password}
              name="password"
              onChange={onChange}
              placeholder="Nuevo password"
              password={true}
              style={[styles.margenT10, styles.margenH10]}
            />
            <InputText
              label="Repetir password"
              value={data.password2}
              name="password2"
              onChange={onChange}
              placeholder="Repetir password"
              password={true}
              style={[styles.margenT10, styles.margenH10]}
            />
            <View style={styles.margen10}>
              <Boton
                style={[styles.margenB10, styles.borderR15]}
                mode="contained"
                onClick={guardar}
                name="Guardar"
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </SideDrawer>
  );
};

Password.propTypes = {
  auth: PropTypes.object.isRequired,
  changePass: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {changePass},
)(Password);
