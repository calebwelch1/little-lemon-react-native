import * as React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const test = async () => {
    const data = await getData('user-profile')
    console.log(data);
    return data;
  }

  const handleMenuPress = () => {
    navigation.navigate('Menu');
  }

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  }

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.topHalf} onPress={handleMenuPress}>
    <ImageBackground source={require('../assets/grilled_fish.png')} style={styles.imageBackground}>
      <Text style={styles.halfText}>Menu</Text>
      </ImageBackground>
    </TouchableOpacity>
    <TouchableOpacity style={styles.bottomHalf} onPress={handleProfilePress}>
      <Text style={styles.halfText}>Profile</Text>
    </TouchableOpacity>
  </View>
  )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    topHalf: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottomHalf: {
      flex: 1,
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
    },
    halfText: {
      fontSize: 54,
      color: 'white',
      textAlign: 'center',
      marginLeft: '31%',
      marginRight: '31%',
      paddingLeft: 0,
      paddingRight: 0,
    },
    image: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
    imageBackground: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 50,
    },
  });


export default Home;
