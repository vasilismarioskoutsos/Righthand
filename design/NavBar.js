import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const NavBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const navigateTo = (screenName) => {
    navigation.navigate(screenName);
  };

  const getIconColor = (screenName) => {
    return route.name === screenName ? '#5C038C' : '#FFF';
  };

  return (
    <View style={styles.propertyHome}>
      <View style={styles.rectangle} />
      <View style={styles.overlapGroup}>
        <TouchableOpacity onPress={() => navigateTo('FeaturesList')}>
          <Icon name="home" style={[styles.icon, {color: getIconColor('FeaturesList')}]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Photo')}>
          <Icon name="photo" style={[styles.icon, {color: getIconColor('Photo')}]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('PaymentScreen')}>
          <Icon name="shopping-cart" style={[styles.icon, {color: getIconColor('PaymentScreen')}]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('ProfileScreen')}>
          <Icon name="account-circle" style={[styles.icon, {color: getIconColor('Profile')}]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    propertyHome: {
        height: 84,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlapGroup: {
        height: 84,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width - 20,
        paddingHorizontal: 10,
    },
    rectangle: {
        position: 'absolute',
        top: 4,
        left: 10,
        right: 10,
        backgroundColor: '#222222',
        borderRadius: 16,
        height: 76,
        width: Dimensions.get('window').width - 20,
    },

    icon: {
        fontSize: 40,
        color: '#FFF',
        marginHorizontal: 20, 
    },
});

export default NavBar;