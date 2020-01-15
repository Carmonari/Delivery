import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableHighlight,
  ImageBackground,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';
import {Avatar} from 'react-native-paper';
import SideDrawer from '../common/SideDrawer';
import InputText from '../common/InputText';
import styles from '../common/css';
import ImagePicker from 'react-native-image-picker';
import isEmpty from '../../validation/is-empty';
import Boton from '../common/Boton';
import {getProfile, editProfile} from '../../actions/usersActions';
import {connect} from 'react-redux';

const Perfil = props => {
  const [data, setData] = useState({
    _id: '',
    name: '',
    aPaterno: '',
    aMaterno: '',
    cel: '',
    email: '',
    avatar: '',
  });

  useEffect(() => {
    props.getProfile(props.auth.user.id);

    const {
      _id,
      name,
      email,
      aPaterno,
      aMaterno,
      cel,
      avatar,
    } = props.user.infoUser;

    setData({
      _id,
      name,
      email,
      aMaterno,
      aPaterno,
      cel,
      avatar: {uri: `http://10.0.2.2:4000/${avatar}`},
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user.infoUser.name]);

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

  const changeImage = () => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.warn('User cancelled image picker');
      } else if (response.error) {
        console.warn('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.warn('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};
        setData({
          ...data,
          avatar: source,
        });
        console.log('User selected a file form camera or gallery', response);
        const dataI = new FormData();
        dataI.append('id', data._id);
        dataI.append('name', response.fileName);
        dataI.append('fileData', {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        });
        const config = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: dataI,
        };
        fetch('http://10.0.2.2:4000/api/users/upload', config)
          .then(checkStatusAndGetJSONResponse => {
            console.log(checkStatusAndGetJSONResponse);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  const onChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const guardar = () => {
    const eProfile = {
      name: data.name,
      email: data.email,
      aPaterno: data.aPaterno,
      aMaterno: data.aMaterno,
      cel: data.cel,
    };
    let {infoUser} = props.user;
    props.editProfile(infoUser._id, eProfile, props.history);
  };

  let image = isEmpty(props.user.infoUser.avatar)
    ? require('../../../assets/user.png')
    : data.avatar;

  return (
    <SideDrawer>
      <ImageBackground
        source={require('../../../assets/background.png')}
        style={styles.imagenFondo}>
        <View style={styles.flex1}>
          <View style={[styles.alginCenter, styles.margenT20]}>
            <TouchableHighlight onPress={changeImage}>
              <Avatar.Image size={120} source={image} />
            </TouchableHighlight>
          </View>
          <View style={styles.margen20}>
            <InputText
              label="Nombre"
              value={data.name}
              name="name"
              onChange={onChange}
              placeholder="Nombre"
              style={[styles.margenT10, styles.margenH10]}
            />
            <InputText
              label="Apellido paterno"
              value={data.aPaterno}
              name="aPaterno"
              onChange={onChange}
              placeholder="Apellido paterno"
              style={[styles.margenT10, styles.margenH10]}
            />
            <InputText
              label="Apellido materno"
              value={data.aMaterno}
              name="aMaterno"
              onChange={onChange}
              placeholder="Apellido Materno"
              style={[styles.margenT10, styles.margenH10]}
            />
            <InputText
              label="Teléfono celular"
              value={data.cel}
              name="cel"
              onChange={onChange}
              placeholder="Teléfono celular"
              keyboardType="numeric"
              style={[styles.margenT10, styles.margenH10]}
            />
            <InputText
              label="Email"
              value={data.email}
              name="email"
              onChange={onChange}
              placeholder="Email"
              style={styles.margen10}
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

Perfil.propTypes = {
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

export default connect(
  mapStateToProps,
  {getProfile, editProfile},
)(Perfil);
