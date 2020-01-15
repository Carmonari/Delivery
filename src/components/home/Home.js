import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Avatar, Chip} from 'react-native-paper';
import {Link} from 'react-router-native';
import PropTypes from 'prop-types';

import SideDrawer from '../common/SideDrawer';
import styles from '../common/css';

const Home = props => {
  return (
    <SideDrawer menu={true}>
      <View>
        <ScrollView>
          <View style={styles.home}>
            <View style={styles.flex1}>
              <Avatar.Image
                size={50}
                source={require('../../../assets/user.png')}
              />
            </View>
            <View style={styles.flex2}>
              <View>
                <Text style={styles.tituloH}>Miami Lounge</Text>
              </View>
              <View>
                <Text style={styles.fontS12}>Coyoacan, 1100 MX</Text>
              </View>
            </View>
            <View style={styles.flex1}>
              <Chip
                textStyle={{color: 'white'}}
                style={{backgroundColor: '#41CE6C'}}
                onPress={() => console.warn('yeah!!')}>
                {' '}
                Entregado
              </Chip>
            </View>
          </View>
          <View style={styles.home}>
            <View style={styles.flex1}>
              <Avatar.Image
                size={50}
                source={require('../../../assets/user.png')}
              />
            </View>
            <View style={styles.flex2}>
              <Link to="/tracking">
                <View>
                  <Text style={styles.tituloH}>Miami Lounge</Text>
                </View>
              </Link>
              <View>
                <Text style={styles.fontS12}>Coyoacan, 1100 MX</Text>
              </View>
            </View>
            <View style={styles.flex1}>
              <Chip
                textStyle={{color: 'white'}}
                style={{backgroundColor: '#FFC300'}}
                onPress={() => console.warn('yeah!!')}>
                {' '}
                En ruta
              </Chip>
            </View>
          </View>
          <View style={styles.home}>
            <View style={styles.flex1}>
              <Avatar.Image
                size={50}
                source={require('../../../assets/user.png')}
              />
            </View>
            <View style={styles.flex2}>
              <View>
                <Text style={styles.tituloH}>Miami Lounge</Text>
              </View>
              <View>
                <Text style={styles.fontS12}>Coyoacan, 1100 MX</Text>
              </View>
            </View>
            <View style={styles.flex1}>
              <Chip
                textStyle={{color: 'white'}}
                style={{backgroundColor: 'blue'}}
                onPress={() => console.warn('yeah!!')}>
                {' '}
                Aceptado
              </Chip>
            </View>
          </View>
          <View style={styles.home}>
            <View style={styles.flex1}>
              <Avatar.Image
                size={50}
                source={require('../../../assets/user.png')}
              />
            </View>
            <View style={styles.flex2}>
              <View>
                <Text style={styles.tituloH}>Miami Lounge</Text>
              </View>
              <View>
                <Text style={styles.fontS12}>Coyoacan, 1100 MX</Text>
              </View>
            </View>
            <View style={styles.flex1}>
              <Chip
                textStyle={{color: 'white'}}
                style={{backgroundColor: '#B2B2A8'}}
                onPress={() => console.warn('yeah!!')}>
                {' '}
                Cancelado
              </Chip>
            </View>
          </View>
        </ScrollView>
      </View>
    </SideDrawer>
  );
};

Home.propTypes = {};

export default Home;
