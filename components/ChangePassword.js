import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import InputField from '../design/InputField';
import CustomButton from '../design/CustomButton';
import { updatePassword } from "firebase/auth";
import auth from "../firebaseConfig";
import NavBar from '../design/NavBar';

const ChangePasswordScreen = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = async () => {
        // Check if user is authenticated
        if (!auth.currentUser) {
            Alert.alert("Error", "You need to be logged in to change your password.");
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Passwords do not match!", "Please ensure your new passwords match.");
            return;
        }

        try {
            await updatePassword(auth.currentUser, newPassword);
            Alert.alert("Password updated successfully");
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <InputField 
                    label={'Current Password'}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    style={styles.input}
                />
                <InputField 
                    label={"New Password"}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    style={styles.input}
                />
                <InputField 
                    label={"Confirm New Password"}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    style={styles.input}
                />
                <CustomButton label={"Change Password"} onPress={handleChangePassword} />
            </View>
            <NavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', 
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 16, 
    },
    input: {
        padding: 12,
        borderBottomWidth: 1,
        marginBottom: 16,
    },
});

export default ChangePasswordScreen;