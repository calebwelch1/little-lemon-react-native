import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
// import { Checkbox } from '@react-native-community/checkbox'
import CheckBox from 'expo-checkbox';

const Profile = ({navigation}) => {
  const [orderCheckBox, setOrderCheckBox] = useState(false)
  const [passwordCheckBox, setPasswordCheckBox] = useState(false)
  const [offerCheckBox, setOfferCheckBox] = useState(false)
  const [newsCheckBox, setNewsCheckBox] = useState(false)


  return (
    <View style={styles.container}>
      <View style={styles.avatarRow}>
        <Image source={require('../assets/Profile.png')} style={styles.avatar} />
        <View style={styles.avatarButtons}>
          <TouchableOpacity style={styles.avatarButton}>
            <Text style={styles.buttonText}>Change</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatarButton}>
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput style={styles.input} placeholder="First Name" />
      <TextInput style={styles.input} placeholder="Last Name" />
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Phone Number" />

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

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.buttonText}>Discard Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
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
});

export default Profile;
