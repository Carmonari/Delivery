import React from 'react';
import {Button, Text} from 'react-native-paper';
import PropTypes from 'prop-types';

const Boton = ({
  mode,
  onClick,
  name,
  textColor = '#FFF',
  backColor = '',
  style,
  icon,
  dis = false,
}) => {
  return (
    <Button
      disabled={dis}
      style={style}
      mode={mode}
      onPress={onClick}
      color={backColor}
      icon={icon}>
      <Text style={{color: textColor, fontSize: 15, fontWeight: '500'}}>
        {name}
      </Text>
    </Button>
  );
};

Boton.propTypes = {
  mode: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Boton;
