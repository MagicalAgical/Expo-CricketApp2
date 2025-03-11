import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
  ImageBackground,
  Image,
  Linking,
} from 'react-native';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: 'https://img.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-599.jpg?t=st=1722712681~exp=1722716281~hmac=ab59530754e604c94d2f3a04034c62cbae9ad011186674c68cd529b14ce80643&w=740',
          }}
          resizeMode="cover"
          style={StyleSheet.absoluteFillObject}
          imageStyle={styles.backgroundImageInner}
        />

        <SafeAreaView style={styles.droidSafeArea} />

        <View style={styles.titleBar}>
          <Text style={styles.titleText}>Cricket Scoring App</Text>
        </View>
        <TouchableOpacity
          style={styles.routeCard}
          onPress={() => this.props.navigation.navigate('FirstInningScreen')}>
          <Text style={styles.routeText}>First Inning</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.routeCard}
          onPress={() => this.props.navigation.navigate('SecondInningScreen')}>
          <Text style={styles.routeText1}>Second Inning</Text>
        </TouchableOpacity>

        <View style={styles.bottomText}>
          <Text style={styles.bottomTEXT}>By Venkata Karavadi</Text>
        </View>

        <View>
          <Text style={styles.noteText}>
            {' '}
            **Data is lost when switching between screens. This issue will be
            updated in the coming year of 2025 summer{' '}
          </Text>
        </View>

        <View>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://magicalagical.github.io/My-Website/')
            }>
            <Text style={styles.linkText}>
              Click me to go to my personal website!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a396d6',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  routeCard: {
    flex: 0.25,
    left: 40,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 80,
    width: 270,
    borderRadius: 32,
    backgroundColor: 'white',
    marginLeft: 30,
    marginRight: 10,
    backgroundColor: '#c8c1e3',
  },
  titleBar: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'cursive',
    color: '#5550e6',
  },
  routeText: {
    fontSize: 35,
    position: 'absolute',
    bottom: 60,
    fontWeight: 'bold',
    color: '#5550e6',
    marginTop: 60,
    paddingLeft: 30,
    fontFamily: 'cursive',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  routeText1: {
    fontSize: 35,
    position: 'absolute',
    bottom: 60,
    right: -47,
    width: 400,
    fontWeight: 'bold',
    color: '#5550e6',
    marginTop: 60,
    paddingLeft: 30,
    fontFamily: 'cursive',
    textAlign: 'center',
  },
  cricketImage: {
    width: 300,
    marginTop: 160,
  },
  bottomText: {
    position: 'absolute',
    bottom: 120,
    left: 130,
  },
  bottomTEXT: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    left: -29,
    color: '#1e92b7',
    bottom: 25,
  },
  noteText: {
    bottom: -20,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 'bold',
  },
  linkText: {
    bottom: -130,
    fontSize: 20,
    fontFamily: 'cursive',
    color: 'blue',
    textAlign: 'center',
  },
});
