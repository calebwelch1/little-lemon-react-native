import * as React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  // Add welcome screen code here.
  return (
    <View style={styles.container}>
    {/* <Image style={styles.logo} source={require('../assets/little-lemon-logo.png')} /> */}
    <Text style={styles.lemon}>Little Lemon, your local Mediterranean bistro</Text>
    <Pressable style={styles.newsletter} onPress={()=>navigation.navigate('S')}><Text style={styles.newsText}>Newsletter</Text></Pressable>
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
    backgroundColor: 'grey',
    borderRadius: 10,
  },
  newsText: {
    color: '#fff',
    paddingLeft: 70,
    paddingRight: 70,
    fontSize: 20,
  },
});


export default WelcomeScreen;
