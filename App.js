import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
//import AudioScreen from './screens/AudioScreen';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Camera" component={CameraScreen} />
        {/* <Tab.Screen name="Audio" component={AudioScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
