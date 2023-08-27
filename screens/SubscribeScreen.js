import * as React from 'react';
import { View, Text, Pressable, Image, StyleSheet, TextInput, Alert} from 'react-native';


const showAlert = () =>
  Alert.alert(
    'Subscription Confirmed',
    'Thanks for subscribing, stay tuned!',
    [
      {
        text: 'Ok',
        style: 'ok',
      },
    ],
  );

const SubscribeScreen = () => {
  const [email, onChangeEmail] = React.useState('')
  // Add subscribe screen code here

  return (
    <View style={styles.container}>
    {/* <Image style={styles.logo} source={require('../assets/little-lemon-logo-grey.png')} /> */}
    <View>
    <TextInput value={email} placeholder="Enter your email" onChangeText={onChangeEmail} style={styles.textInput}></TextInput>
    </View>
    <Text style={styles.lemon}>Subscribe to our newsletter for our latest delicious recipes!</Text>
    {/* <Pressable disabled={!validateEmail(email)} style={validateEmail(email) ? styles.newsletter : styles.newsletterDisabled} onPress={showAlert}><Text style={styles.newsText}>Subscribe</Text></Pressable> */}
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
    marginBottom: 50,
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
  }
});
export default SubscribeScreen;
