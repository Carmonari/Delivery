import React from 'react';
import {Image} from 'react-native';
import {withRouter} from 'react-router-native';
import {Appbar, withTheme} from 'react-native-paper';

const Header = props => {
  const {colors} = props.theme;
  const menuBack = props.menu ? 'menu' : 'arrow-left';

  return (
    <Appbar.Header style={{backgroundColor: colors.background}}>
      <Appbar.Action icon={menuBack} onPress={props.abrir} size={33} />
      <Appbar.Content
        titleStyle={{flex: 1, textAlign: 'center', marginRight: '15%'}}
        title={
          <Image
            style={{width: 125, height: 35}}
            source={require('../../../assets/orderit.png')}
          />
        }
        onPress={() => props.history.push('/home')}
      />
    </Appbar.Header>
  );
};

export default withTheme(withRouter(Header));
