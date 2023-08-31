import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Header} from 'react-native';
import {validateEmail} from '../utils/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Onboarding = ({ navigation }) => {

  const [firstName, onChangeFirstName] = React.useState('')
//   const [lastName, onChangeLastName] = React.useState('')
  const [email, onChangeEmail] = React.useState('')

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      console.log('storing', key, jsonValue);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const onBoardingPress = async () => {
    const profile = {
        firstName: firstName,
        email: email,
    }

    await storeData('user-profile', profile)
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
    {/* <Header></Header> */}
    {/* <Image style={styles.logo} source={require('../assets/little-lemon-logo.png')} /> */}
    <Text style={styles.main}> Let us get to know you</Text>
    <TextInput value={firstName} placeholder="First Name" onChangeText={onChangeFirstName} style={styles.textInput}></TextInput>
    {/* <TextInput value={lastName} placeholder="Last Name" onChangeText={onChangeLastName} style={styles.textInput}></TextInput>
     */}
    <TextInput value={email} placeholder="Enter your email" onChangeText={onChangeEmail} style={styles.textInput}></TextInput>
    {/* <Text style={styles.lemon}>Little Lemon, your local Mediterranean bistro</Text> */}
    {/* <Pressable style={styles.newsletter} onPress={()=>navigation.navigate('S')}><Text style={styles.newsText}>Newsletter</Text></Pressable> */}
    <Pressable disabled={!validateEmail(email) || firstName === ''} style={validateEmail(email) && firstName != '' ? styles.newsletter : styles.newsletterDisabled} onPress={onBoardingPress}><Text style={styles.newsText}>Next</Text></Pressable>
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


export default Onboarding;
