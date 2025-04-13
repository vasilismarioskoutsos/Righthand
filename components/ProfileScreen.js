import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NavBar from '../design/NavBar';

const ProfileScreen = ({ navigation }) => {

  const ProfileButton = ({ title, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
      <Text style={styles.buttonArrow}>&gt;</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileButtonsContainer}>
        <ProfileButton title="Manage Subscriptions" onPress={() => navigation.navigate('FeaturesList')} />
        <ProfileButton title="Change Password" onPress={() => navigation.navigate('ChangePasswordScreen')} />
        <ProfileButton title="Manage Account" onPress={() => navigation.navigate('ManageAccount')} />
        <ProfileButton title="Preferences" onPress={() => navigation.navigate('Preferences')} />
        <ProfileButton title="Rate the App" onPress={() => navigation.navigate('RateApp')} />
        <ProfileButton title="Contact Us" onPress={() => navigation.navigate('ContactUs')} />
        <ProfileButton title="Privacy Policy" onPress={() => navigation.navigate('PrivacyPolicy')} />
      </View>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'flex-end',  
  },
  profileButtonsContainer: {
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#A9A9A9',
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#A9A9A9',
    fontSize: 18,
    fontFamily: 'Clash',
  },
  buttonArrow: {
    color: '#A9A9A9',
    fontSize: 18,
    fontFamily: 'Clash',
  },
});

export default ProfileScreen;