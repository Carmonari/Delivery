import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 10,
  },
  imagenFondo: {
    width: '100%',
    height: '100%',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  marginV: {
    marginVertical: 5,
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
  },
  forgot: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
});

export default styles;
