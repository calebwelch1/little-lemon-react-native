import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Header} from 'react-native';

const Home = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text> Home Screen</Text>
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


export default Home;
