import React, { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeaturesList from './components/FeaturesList';
import LoginScreen from './components/LoginScreen'; 
import SignUpScreen from './components/SignupScreen';
import PaymentScreen from './components/PaymentScreen';
import ImageSelection from './components/ImageSelection';
import ResultsScreen from './components/ResultsScreen';
import ProfileScreen from './components/ProfileScreen';
import ChangePasswordScreen from './components/ChangePassword';
import auth from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'Clash': require('./fonts/ClashGroteskRegular.ttf'),
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      setUser(user);
    });

    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "FeaturesList" : "Login"} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FeaturesList" component={FeaturesList} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="ImageSelection" component={ImageSelection} />
        <Stack.Screen name="ResultsScreen" component={ResultsScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );  
}