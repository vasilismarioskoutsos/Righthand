import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import LogoPng from '../png/Logo2.png';
import CustomButton from '../design/CustomButton';
import InputField from '../design/InputField';
import auth from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signUp = async () => {

        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }
    
        setLoading(true);
        setError(null);
        console.log('Email:', email);
        try {
            if (password !== confirmPassword) {
                setError('Passwords do not match!');
                return;
            }
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            navigation.navigate('FeaturesList'); 
        } catch (error) {
            console.log(error);
            setError('Registration Failed:' + error.message);
        } finally {
            setLoading(false);
        }
    }    

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <View style={{alignItems: 'center'}}>
                <Image source={LogoPng} style={{ height: 230, width: 230, marginTop: 50 }} />
            </View>

            <Text style={{ fontSize: 28, fontWeight: '500', color: '#333', marginBottom: 30, }}>
            Create Account
            </Text>

            <InputField label={'Email'} keyboardType="email-address" autoCapitalize="none" onChangeText={setEmail} />

            <InputField label={'Password'} inputType="password" autoCapitalize="none" onChangeText={setPassword} />

            <InputField label={'Confirm Password'} inputType="password" autoCapitalize="none" onChangeText={setConfirmPassword} />

            {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}

            {loading ? (
                <ActivityIndicator size='large' color='#440055ff' />
            ) : (
                <CustomButton label={"Sign Up"} onPress={signUp} />
            )}

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30, }}>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{color: '#AD40AF', fontWeight: '700'}}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default SignUpScreen;