import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Image } from 'react-native';
import ExplainPng from '../png/explain.png';
import MultChoicePng from '../png/multChoice.png';
import SummaryPng from '../png/summary.png';
import TFPng from '../png/true_false.png';
import NavBar from '../design/NavBar';

const FeaturesList = ({ navigation }) => {

  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const boxWidth = Dimensions.get('window').width * 0.61;
  const boxDistance = scrollViewWidth - boxWidth;
  const boxHeightRatio = 2.18; 
  const boxHeight = boxWidth * boxHeightRatio;
  const halfBoxDistance = boxDistance / 2;
  const pan = useRef(new Animated.ValueXY()).current;

  const data = [
    { id: 'quiz', label: 'Make a Quiz', image: MultChoicePng },
    { id: 'explain', label: 'Explain', image: ExplainPng },
    { id: 'summary', label: 'Summary', image: SummaryPng },
    { id: 'true_false', label: 'True/False', image: TFPng },
  ];

  const renderItem = ({ item }) => {

    return (
      <TouchableOpacity
        style={[styles.feature, { width: boxWidth, height: boxHeight, justifyContent: 'center', alignItems: 'center' }]}
        onPress={() => navigation.navigate('ImageSelection')}>
        <Text style={styles.featureText}>{item.label}</Text>
        <Image source={item.image} style={{ width: 200, height: 200 }} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Feature</Text>
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

export default FeaturesList;