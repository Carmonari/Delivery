import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  // fondos
  fondoGris: {
    backgroundColor: '#F3F0EC',
    minHeight: Dimensions.get('window').height,
  },
  fondoVerde: {
    backgroundColor: '#167634',
  },
  fondoBlanco: {
    backgroundColor: '#FFFFFF',
  },
  imagenFondo: {
    width: '100%',
    height: '100%',
  },

  // Estilos especificos
  viewImgEmail: {
    margin: 10,
    flexDirection: 'row',
  },
  textNombreEmail: {
    marginTop: 20,
    marginLeft: 10,
  },

  // Colores
  colorBlanco: {
    color: '#FFF',
  },

  //Flex
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },

  //Magenes
  margen10: {
    margin: 10,
  },
  margenT10: {
    marginTop: 10,
  },
  margenB10: {
    marginBottom: 10,
  },
  margenB30: {
    marginBottom: 30,
  },
  margenH10: {
    marginHorizontal: 10,
  },
  margen20: {
    margin: 20,
  },
  margenT20: {
    marginTop: 20,
  },

  //Radius
  borderR15: {
    borderRadius: 15,
  },

  //Aligns
  alginCenter: {
    alignItems: 'center',
  },

  //Fonts
  fontS12: {
    fontSize: 12,
  },

  //Button
  fijo: {
    position: 'relative',
    bottom: 20,
  },

  //Home
  home: {
    margin: 15,
    flexDirection: 'row',
  },
  tituloH: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
