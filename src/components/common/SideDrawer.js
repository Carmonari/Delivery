import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import SideMenu from 'react-native-side-menu';
import ControlPanel from './ControlPanel';
import {withRouter} from 'react-router-native';
import styles from './css';
import {connect} from 'react-redux';
import {getProfile} from '../../actions/usersActions';
import Header from '../common/Header';

const SideDrawer = props => {
  const [open, setOpen] = useState(false);
  const {id} = props.auth;
  useEffect(() => {
    props.getProfile(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user.infoUser.name]);

  const openMenu = () => {
    setOpen(true);
  };

  const atras = () => {
    props.history.goBack();
  };

  let funcion = props.menu ? openMenu : atras;

  return (
    <SideMenu
      menu={<ControlPanel history={props.history} {...props.user} />}
      isOpen={open}
      onChange={res => setOpen(res)}>
      <View style={styles.fondoGris}>
        <Header menu={props.menu} abrir={funcion} />
        {props.children}
      </View>
    </SideMenu>
  );
};

SideDrawer.propTypes = {
  getProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth.user,
  user: state.user,
});

export default withRouter(
  connect(
    mapStateToProps,
    // eslint-disable-next-line no-undef
    {getProfile},
  )(SideDrawer),
);
