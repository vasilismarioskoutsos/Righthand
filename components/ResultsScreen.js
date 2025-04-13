import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { GOOGLE_KEY, OPENAI_KEY } from '../config';
import * as FileSystem from 'expo-file-system';

const ResultsScreen = ({ route }) => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true);

  const processText = async (images, feature) => {
    const texts = await recognizeTexts(images);
    const response = await getOpenAIResponse(texts, feature);
    setResult(response);
    setLoading(false);
  };

  const recognizeTexts = async (images) => {
    try {
      const textPromises = images.map(async (imageUri) => {
        const base64Image = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const response = await axios.post(
          `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_KEY}`,
          {
            requests: [
              {
                image: {
                  content: base64Image,
                },
                features: [
                  {
                    type: 'TEXT_DETECTION',
                  },
                ],
              },
            ],
          }
        );

        const { data } = response;
        const textAnnotations = data.responses[0]?.textAnnotations;
        return textAnnotations[0]?.description || '';
      });

      return Promise.all(textPromises);
    } catch (error) {
      console.error('Error in Google Vision API:', error.response?.data || error);
      return [];
    }
  };

  const getOpenAIResponse = async (texts, feature) => {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
    };
  
    const prompt = texts.map((text) => getPrompt(text, feature)).join('');
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        { prompt, max_tokens: 150 },
        axiosConfig
      );
  
      const choices = response.data.choices;
      const result = choices.map((choice) => choice.text.trim()).join('\n\n');
  
      return result;
    } catch (error) {
      console.error('Error in OpenAI API:', error.response?.data || error);
      return '';
    }
  };

  const getPrompt = (text, feature) => {
    switch (feature) {
      case 'quiz':
        return `Create a quiz based on the following text:\n\n${text}\n\nQuiz:\n`;
      case 'explain':
        return `Explain the following text in simpler terms:\n\n${text}\n\nExplanation:\n`;
      case 'summary':
        return `Write a summary of the following text:\n\n${text}\n\nSummary:\n`;
      case 'true_false':
        return `Create a true false quiz based on the following text:n\n${text}\n\nTrue/False:\n`;
      default:
        return 'No feature was selected\n';
    }
  };

  useEffect(() => {
    processText(route.params.images, route.params.feature);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.result}>{result}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  result: {
    fontSize: 18,
    textAlign: 'justify',
  },
});

export default ResultsScreen;