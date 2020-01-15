/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ScrollView, TouchableHighlight} from 'react-native';
import {Link} from 'react-router-native';
import {List, Avatar} from 'react-native-paper';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {logoutUser} from '../../actions/authActions';
import Boton from '../common/Boton';
import styles from './css';
import isEmpty from '../../validation/is-empty';

const ControlPanel = props => {
  const logout = () => {
    props.logoutUser();
  };

  let image = isEmpty(props.infoUser.avatar)
    ? require('../../../assets/user.png')
    : {uri: `http://10.0.2.2:4000/${props.infoUser.avatar}`};

  return (
    <View style={styles.flex1}>
      <View style={styles.fondoVerde}>
        <View>
          <Link to="perfil-info" component={TouchableHighlight}>
            <View style={styles.viewImgEmail}>
              <Avatar.Image size={80} source={image} />
              <View style={styles.textNombreEmail}>
                <Text style={styles.colorBlanco}>{props.infoUser.name}</Text>
                <Text style={styles.colorBlanco}>{props.infoUser.email}</Text>
              </View>
            </View>
          </Link>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#41CE6C',
          flex: 1,
          flexDirection: 'column',
          zIndex: -100,
        }}>
        <ScrollView style={{overflow: 'visible', flex: 1}}>
          <List.Section>
            <List.Item
              title="Home"
              titleStyle={styles.colorBlanco}
              left={props => <List.Icon {...props} icon="home" color="#fff" />}
              onPress={() => props.history.push('/home')}
            />
            <List.Item
              title="Pagos"
              titleStyle={styles.colorBlanco}
              left={props => <List.Icon {...props} icon="check" color="#fff" />}
              onPress={() => props.history.push('/home')}
            />
            <List.Item
              title="Mis entregas"
              titleStyle={styles.colorBlanco}
              left={props => (
                <List.Icon {...props} icon="truck-delivery" color="#fff" />
              )}
              onPress={() => props.history.push('/home')}
            />
            <List.Item
              title="Preferencias"
              titleStyle={styles.colorBlanco}
              left={props => (
                <List.Icon {...props} icon="settings" color="#fff" />
              )}
              onPress={() => props.history.push('/home')}
            />
          </List.Section>
        </ScrollView>
        <Boton mode="contained" onClick={logout} name="Logout" />
      </View>
    </View>
  );
};

ControlPanel.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

export default connect(
  null,
  {logoutUser},
)(ControlPanel);
