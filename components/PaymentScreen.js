import React, { useState, useRef } from 'react';
import { StyleSheet, View, Dimensions, Animated, TouchableOpacity, Text } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import Payment from './Payment';
import NavBar from '../design/NavBar';

const PaymentScreen = () => {

  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const boxWidth = Dimensions.get('window').width * 0.61;
  const boxDistance = scrollViewWidth - boxWidth;
  const boxHeightRatio = 2.18; 
  const boxHeight = boxWidth * boxHeightRatio;
  const halfBoxDistance = boxDistance / 2;
  const pan = useRef(new Animated.ValueXY()).current;

  const data = [
    { id: 'one_time', label: 'One-time Buy', price: '$3', bulletPoints: ['Access to premium features', 'One-time purchase', 'No recurring fees'] },
    { id: 'monthly_5', label: 'Monthly Subscription', price: '$5/month', bulletPoints: ['Unlimited access', 'Monthly renewal', 'Best value'] },
    { id: 'monthly_10', label: 'Deluxe Monthly Subscription', price: '$10/month', bulletPoints: ['All premium features', 'Priority support', 'Monthly renewal'] },
  ];

  const initiatePayment = (price) => {
    // Render the Payment component with the price
    <Payment price={price.replace('$', '')} />
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={[styles.feature, { width: boxWidth, height: boxHeight, justifyContent: 'center', alignItems: 'center' }]} 
        onPress={() => initiatePayment(item.price)}>
        <Text style={styles.featureText}>{item.label}</Text>
        <Text style={styles.featureText}>{item.price}</Text>
        {item.bulletPoints.map(point => (
          <Text key={point} style={styles.featureText}>{point}</Text>
        ))}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StripeProvider publishableKey="pk_test51NQqLABxbhZ6q0N5NfgpveSUsupnZd7Z9eNw0wWMZaPgTL6QkB6vUuXLBYqOZdZndcQdS3ZrbO1geOCORc24Y2ld00kBVjZ2Eo">
        <View style={styles.features}>
          <Animated.FlatList
            horizontal
            data={data}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingVertical: 16 }}
            contentInsetAdjustmentBehavior="never"
            snapToAlignment="center"
            decelerationRate="fast"
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={1}
            snapToInterval={boxWidth}
            contentInset={{
              left: halfBoxDistance,
              right: halfBoxDistance,
            }}
            contentOffset={{ x: halfBoxDistance * -1, y: 0 }}
            onLayout={(e) => {
              setScrollViewWidth(e.nativeEvent.layout.width);
            }}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: pan.x } } }], {
              useNativeDriver: false,
            })}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </View>
      </StripeProvider>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
    paddingTop: 80,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Clash',
    marginBottom: 30,
  },
  features: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  feature: {
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#1e1e1e',
  },
  featureText: {
    fontSize: 18,
    fontFamily: 'Clash',
    marginTop: 10,
  },
});

export default PaymentScreen;