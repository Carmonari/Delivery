import React, {useEffect} from 'react';
import {View, ScrollView, ImageBackground, BackHandler} from 'react-native';
import PropTypes from 'prop-types';
import {Avatar, List} from 'react-native-paper';
import SideDrawer from '../common/SideDrawer';
import {connect} from 'react-redux';
import isEmpty from '../../validation/is-empty';
import styles from '../common/css';

const PerfilInfo = props => {
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

  let image = isEmpty(props.user.infoUser.avatar)
    ? require('../../../assets/user.png')
    : props.user.infoUser.avatar;

  return (
    <SideDrawer menu={true}>
      <ImageBackground
        source={require('../../../assets/background.png')}
        style={styles.imagenFondo}>
        <View style={styles.flex1}>
          <View style={[styles.alginCenter, styles.margenT20]}>
            <Avatar.Image
              size={128}
              source={{uri: `http://10.0.2.2:4000/${image}`}}
            />
          </View>
          <View>
            <ScrollView>
              <List.Section style={[styles.fondoBlanco, styles.margen20]}>
                <List.Item
                  title="Mi información"
                  left={() => <List.Icon icon="account-circle" />}
                  onPress={() => props.history.push('/perfil')}
                />
                <List.Item
                  title="Cambiar password"
                  left={() => <List.Icon icon="key-change" />}
                  onPress={() => props.history.push('/password')}
                />
                <List.Item
                  title="Mis entregas"
                  left={() => <List.Icon icon="truck-delivery" />}
                  onPress={() => props.history.push('/perfil')}
                />
              </List.Section>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </SideDrawer>
  );
};

PerfilInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(PerfilInfo);
