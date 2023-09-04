import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Pressable} from 'react-native';
import { useState, useEffect } from 'react';
import {validateEmail} from '../utils/index';
// import { Checkbox } from '@react-native-community/checkbox'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';

const Profile = ({navigation}) => {
  const [firstName, setFirstName] = React.useState('')
  const [loaded, setLoaded] = React.useState(false)
  const [profileImage, setProfileImage] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [orderCheckBox, setOrderCheckBox] = useState(false)
  const [passwordCheckBox, setPasswordCheckBox] = useState(false)
  const [offerCheckBox, setOfferCheckBox] = useState(false)
  const [newsCheckBox, setNewsCheckBox] = useState(false)
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      console.log('storing', key, jsonValue);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const onSavePress = async () => {
    const profile = {
        firstName: firstName,
        email: email,
        lastName,
        email,
        phone,
        orderCheckBox,
        passwordCheckBox,
        offerCheckBox,
        newsCheckBox,
    }

    await storeData('user-profile', profile)
    // TODO: alert info saved!
  }

  const onLogoutPress = async () => {
      try {
        await AsyncStorage.removeItem('user-profile')
      } catch(e) {
        // remove error
      }
    
      console.log('Done.')
    navigation.navigate('O')
  }

  const validatePhone = (num) => {
    if (num.length === 0) {
      return true
    }
    else if (num.length === 10) {
      return true
    }
    else {
      return false
    }
  }

  const initials = () => {
    if (lastName === '') {
      return `${firstName[0]}`
    }
    else {
      return `${firstName[0]}${lastName[0]}`
    }
    // return `${firstName[0]} ${ lastName !== undefined ? lastName[0] : ''}`
  }

  useEffect( () => {
     const loadProfile = async () => {
      const data = await getData('user-profile')
      console.log(data);
      if (data != null ) {
        setFirstName(data.firstName);
        setEmail(data.email);
      }
      setLoaded(true);
     }
     if (loaded === false) {
     loadProfile();
     }
  })

  return (
    <View style={styles.container}>
      <View style={styles.avatarRow}>
        
        { !image && <View style={styles.textAvatar}>
        <Text style={{color: 'white', marginTop: '30%', marginLeft: '30%'}} >{initials()}</Text>
        </View>
        }
        { image && <Image source={{ uri: image }} style={styles.avatar}/>}
        {/* {/* // ) : (
        // <Image source={require('../assets/Profile.png')} style={styles.avatar} />
        // ''
        // ) } */}
        <View style={styles.avatarButtons}>
          <Pressable style={styles.avatarButton} onPress={pickImage}>
            <Text style={styles.buttonText}>Change</Text>
          </Pressable>
          <Pressable style={styles.avatarButton} onPress={() => setImage(null)}>
            <Text style={styles.buttonText}>Remove</Text>
          </Pressable>
        </View>
      </View>
      <Text>First Name</Text>
      <TextInput style={styles.input} value={firstName} onChangeText={setFirstName}/>
      <Text>Last Name</Text>
      <TextInput style={styles.input} value={lastName} onChangeText={setLastName}/>
      <Text>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail}/>
      <Text>Phone Number</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone}/>

      <View style={styles.notificationSection}>
        <View style={styles.notificationRow}>
           <CheckBox
          disabled={false}
          value={orderCheckBox}
          onValueChange={(newValue) => setOrderCheckBox(newValue)}
          // onValueChange={setOrderCheckBox(!orderCheckBox)}
          />
          <Text style={styles.notificationText}>Order Statuses</Text>
        </View>
        <View style={styles.notificationRow}>
           <CheckBox
          disabled={false}
          value={passwordCheckBox}
          onValueChange={(newValue) => setPasswordCheckBox(newValue)}
          />
          <Text style={styles.notificationText}>Password Changes</Text>
        </View>
        <View style={styles.notificationRow}>
           <CheckBox
          disabled={false}
          value={offerCheckBox}
          onValueChange={(newValue) => setOfferCheckBox(newValue)}
          />
          <Text style={styles.notificationText}>Special Offers</Text>
        </View>
        <View style={styles.notificationRow}>
           <CheckBox
          disabled={false}
          value={newsCheckBox}
          onValueChange={(newValue) => setNewsCheckBox(newValue)}
          />
          <Text style={styles.notificationText}>Newsletter</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={onLogoutPress}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.buttonText}>Discard Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={!validateEmail(email) || validatePhone(phone) ? styles.bottomButton : styles.bottomButtonDisabled} disabled={!validateEmail(email) || !validatePhone(phone)} onPress={onSavePress}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  textAvatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginRight: 20,
    backgroundColor: 'grey',
    color: 'white',
    fontSize: 20,
  },
  avatarButtons: {
    flexDirection: 'row',
  },
  avatarButton: {
    backgroundColor: 'blue',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  notificationSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  notificationText: {
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: 'red',
    width: '80%',
    paddingVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomButton: {
    backgroundColor: 'green',
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  bottomButtonDisabled: {
    backgroundColor: 'grey',
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
});

export default Profile;
