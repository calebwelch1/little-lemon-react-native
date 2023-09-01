import * as React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  useEffect( () => {
    const checkLoggin = async () => {
      const data = await getData('user-profile')
      console.log(data);
      if (data != null ) {
        navigation.navigate('Home');
      }
      else {
      navigation.navigate('O')
      }
    }
    checkLoggin();
  });

  return (
    <View style={styles.container}>
    <Image
      style={{ width: 200, height: 50, marginLeft: '20%', }}
      source={require('../assets/wide_logo.png')}
    />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    fontSize: 26,
    fontWight: 'bold',
  },
  lemon: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 30,
    paddingLeft: 40,
    paddingRight: 40,
    marginBottom: 200,
  },
  logo: {
    height: 200,
    width: 100,
    resizeMode: 'contain',
  },
  newsletter: {
    backgroundColor: 'black',
    borderRadius: 10,
  },
  newsletterDisabled: {
    backgroundColor: 'grey',
    borderRadius: 10,
  },
  newsText: {
    color: '#fff',
    paddingLeft: 70,
    paddingRight: 70,
    fontSize: 20,
  },
  textInput: {
    width: 250,
    height: 30,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: '20%',
  },
});


export default Splash;
