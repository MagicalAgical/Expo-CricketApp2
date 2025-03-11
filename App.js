import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "./screens/HomeScreen";
import FirstInningScreen from "./screens/FirstInning"
import SecondInningScreen from "./screens/SecondInning"


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FirstInningScreen" component={FirstInningScreen}/>
        <Stack.Screen name="SecondInningScreen" component={SecondInningScreen}/>
         
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;