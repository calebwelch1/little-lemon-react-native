import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native';
// import WelcomeScreen from "../screens/WelcomeScreen";
import SubscribeScreen from "../screens/SubscribeScreen";
import Onboarding from '../screens/Onboarding';
import Profile from '../screens/Profile';
import Home from '../screens/Home';
import Splash from '../screens/Splash';
import Menu from '../screens/MenuScreen';


const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 200, height: 50, marginLeft: '27%', }}
      source={require('../assets/Logo.png')}
    />
  );
}

const RootNavigator = () => {
  return (
    <Stack.Navigator>
          {/* <Stack.Screen
          options={{
            title:'Welcome',
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontWeight: 'bold',
            },
          }}
          name="W"
          component={WelcomeScreen}
          /> */}
          <Stack.Screen
          // options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          name="Splash"
          component={Splash}
          />
          <Stack.Screen
          // options={{
          //   title:'Onboarding',
          //   headerTitleAlign: 'center',
          //   headerTitleStyle:{
          //     fontWeight: 'bold',
          //   },
          // }}
          options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          name="O"
          component={Onboarding}
          />
          <Stack.Screen
          options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          name="Profile"
          component={Profile}
          />
          <Stack.Screen
          options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          name="Menu"
          component={Menu}
          />
          <Stack.Screen
          options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          name="Home"
          component={Home}
          />
        <Stack.Screen
        name="S"
        options={{
          title:'Subscribe',
          headerTitleAlign: 'center',
          headerTitleStyle:{
            fontWeight: 'bold',
          },
        }}
        component={SubscribeScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
