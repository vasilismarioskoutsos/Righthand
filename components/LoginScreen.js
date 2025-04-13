import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import LogoPng from '../png/Logo2.png';
import CustomButton from '../design/CustomButton';
import InputField from '../design/InputField';
import auth from "../firebaseConfig";
import { signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async () => {

        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
           // --------------->>>>>> navigation.navigate('FeaturesList'); kanonika edo mpainei
        } catch (error) {
            console.log(error);
            alert('Login Failed:' + error.message);
        } finally {
            setLoading(false);
            navigation.navigate('FeaturesList');
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                navigation.navigate('FeaturesList');
            } else {
                // User is not signed in
                // Show the login screen
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', backgroundColor: '#121212'}}>
            <View style={{paddingHorizontal: 25}}>
                <View style={{alignItems: 'center'}}>
                    <Image source={LogoPng} style={{ height: 230, width: 230 }} />
                </View>

                <Text style={{ fontSize: 28, fontWeight: '500', color: 'white', marginBottom: 30, fontFamily: 'Clash'}}>
                Login
                </Text>

                <InputField label='Email' PlaceholderColor='white' inputColor='white' keyboardType="email-address" autoCapitalize="none" onChangeText={setEmail} />

                <InputField label='Password' inputType="password" fieldButtonLabel={"Forgot Password"} 
                fieldButtonFunction={() => sendPasswordResetEmail(auth, email)}
                autoCapitalize="none" onChangeText={setPassword} />

                {error && <Text style={{ color: 'red', marginBottom: 10, fontFamily: 'Clash' }}>{error}</Text>}
                    
                {loading ? (
                    <ActivityIndicator size='large' color='#440055ff' />
                ) : (
                    <CustomButton label={"Login"} onPress={login} />
                )}

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30, }}>
                    <Text style={{ fontFamily: 'Clash', color: 'white'}}>New to the app?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={{color: '#AD40AF', fontWeight: '700', fontFamily: 'Clash'}}> SignUp </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;