import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native';
// import WelcomeScreen from "../screens/WelcomeScreen";
import SubscribeScreen from "../screens/SubscribeScreen";
import Onboarding from '../screens/Onboarding';

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
