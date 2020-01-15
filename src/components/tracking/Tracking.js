import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Platform,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import io from 'socket.io-client';
import MapView, {Polyline, Marker} from 'react-native-maps';
import PolyLine from '@mapbox/polyline';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import Geolocation from '@react-native-community/geolocation';

const Tracking = props => {
  const [info, setInfo] = useState({
    error: '',
    latitude: null,
    longitude: null,
    lookingForClient: false,
    pointCoords: [],
    clientFound: false,
  });

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permision',
          message: 'This app needs acces to you location',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('you can use location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
    Geolocation.watchPosition(
      position => {
        setInfo({
          ...info,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error =>
        setInfo({
          ...info,
          error: error.message,
        }),
      {enableHighAccuracy: true, maximumAge: 2000, timeout: 2000},
    );
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 50,
      debug: false,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
    });

    BackgroundGeolocation.on('authorization', status => {
      console.log(
        '[INFO] BackgroundGeolocation authorization status: ' + status,
      );
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(
          () =>
            Alert.alert(
              'App requires location tracking permission',
              'Would you like to open app settings?',
              [
                {
                  text: 'Yes',
                  onPress: () => BackgroundGeolocation.showAppSettings(),
                },
                {
                  text: 'No',
                  onPress: () => console.log('No Pressed'),
                  style: 'cancel',
                },
              ],
            ),
          1000,
        );
      }
    });
  }, []);

  const getRouteDirections = async placeId => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${info.latitude}, ${info.longitude}&destination=place_id:${placeId}&key=AIzaSyDcS03AM2Nh90g0VTGxA-5KN98scaz6eqw`,
      );
      if (placeId) {
        const json = await response.json();
        console.log(json);
        const points = PolyLine.decode(json.routes[0].overview_polyline.points);
        const pointCoords = points.map(point => {
          return {
            latitude: point[0],
            longitude: point[1],
          };
        });
        setInfo({
          ...info,
          pointCoords,
        });
        this.map.fitToCoordinates(pointCoords);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const lookForClient = () => {
    setInfo({
      ...info,
      lookingForClient: true,
    });

    const socket = io('http://192.168.15.2:3000');

    socket.on('connect', () => {
      socket.emit('clientRequest');
    });

    socket.on('deliveryRequest', routeResponse => {
      console.log(routeResponse);
      getRouteDirections(routeResponse.geocoded_waypoints[0].place_id);
      setInfo({
        ...info,
        lookingForClient: false,
        clientFound: true,
        routeResponse,
      });
    });
  };

  const acceptClientRequest = () => {
    const passengerLocation = info.pointCoords[info.pointCoords.length - 1];

    BackgroundGeolocation.on('location', location => {
      this.socket.emit('driveLocation', {
        latitude: location.latitude,
        longitude: location.longitude,
      });
    });

    BackgroundGeolocation.checkStatus(status => {
      if (!status.isRunning) {
        BackgroundGeolocation.start();
      }
    });

    if (Platform.OS === 'android') {
      Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&destination=${passengerLocation.latitude}, ${passengerLocation.longitude}`,
      );
    }
  };

  let marker = null;
  let findingClientActIndicator = null;
  let clientSearchText = 'Buscar cliente';
  let bottomButtomFunction = lookForClient;

  if (info.latitude === null) {
    return null;
  }

  if (info.lookingForClient) {
    clientSearchText = 'Buscando cliente...';
    findingClientActIndicator = (
      <ActivityIndicator size="large" animating={info.lookingForClient} />
    );
  }

  if (info.clientFound) {
    clientSearchText = 'Found client! accept delivery?';
    bottomButtomFunction = acceptClientRequest;
  }

  if (info.pointCoords.length > 1) {
    marker = (
      <Marker coordinate={info.pointCoords[info.pointCoords.length - 1]} />
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={map => {
          map = map;
        }}
        style={styles.map}
        initialRegion={{
          latitude: info.latitude,
          longitude: info.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation={true}>
        <Polyline
          coordinates={info.pointCoords}
          strokeWidth={4}
          strokeColor="red"
        />
        {marker}
      </MapView>
      <TouchableOpacity
        style={styles.buttomButton}
        onPress={bottomButtomFunction}>
        <View>
          <Text style={styles.buttomButtonText}>{clientSearchText}</Text>
          {findingClientActIndicator}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  destinationInput: {
    height: 40,
    borderWidth: 1,
    marginTop: 50,
    marginHorizontal: 5,
    padding: 5,
    backgroundColor: 'white',
  },
  suggestions: {
    backgroundColor: 'white',
    padding: 5,
    fontSize: 18,
    borderWidth: 0.5,
    marginHorizontal: 5,
  },
  buttomButton: {
    backgroundColor: 'black',
    marginTop: 'auto',
    margin: 20,
    padding: 20,
    paddingHorizontal: 30,
    alignSelf: 'center',
  },
  buttomButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Tracking;
