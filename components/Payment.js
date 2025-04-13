import { useStripe } from "@stripe/stripe-react-native";
import React from "react";
import { View, Button, Alert } from "react-native";

const Payment = ({ price }) => {
  const stripe = useStripe();

  const subscribe = async () => {
    try {
      const response = await fetch("http://localhost:3000/pay", {
        method: "POST",
        body: JSON.stringify({ price }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;

      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      Alert.alert("Payment complete, thank you!");
    } catch (err) {
      console.error(err);
      Alert.alert("Something went wrong, try again later!");
    }
  };

  return (
    <View>
      <Button title={`Subscribe - ${price}`} onPress={subscribe} />
    </View>
  );
};

export default Payment;