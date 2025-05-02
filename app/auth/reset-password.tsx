import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import {Link, useLocalSearchParams, useRouter} from "expo-router/build/rsc/exports";

export default function ResetPassword() {
    const [emailOrPassword, setEmailOrPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
    const { token } = useLocalSearchParams(); // Type the params

    const handleResetPassword = async () => {
        setLoading(true);
        setError('');
        setMessage('');
        try {
            if (token) {
                // Case 1: Update password with token
                await axios.post('http://your-backend-url/api/reset-password', {
                    token,
                    newPassword: emailOrPassword,
                });
                setMessage('Password updated successfully!');
                router.replace('/auth/login');
            } else {
                // Case 2: Request reset link
                await axios.post('http://your-backend-url/api/reset-password', {
                    email: emailOrPassword,
                });
                setMessage('Reset link sent! Check your email.');
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to process reset request.';
            setError(errorMessage);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
                {token ? 'Enter your new password.' : 'Enter your email to receive a reset link.'}
            </Text>

            <TextInput
                style={styles.input}
                placeholder={token ? 'New password' : 'Email address'}
                placeholderTextColor="#999"
                value={emailOrPassword}
                onChangeText={setEmailOrPassword}
                keyboardType={token ? 'default' : 'email-address'}
                autoCapitalize="none"
                secureTextEntry={!!token}
            />

            <TouchableOpacity style={styles.actionButton} onPress={handleResetPassword} disabled={loading}>
                <Text style={styles.actionButtonText}>
                    {token ? 'UPDATE PASSWORD' : 'SEND RESET LINK'}
                </Text>
            </TouchableOpacity>

            <View style={styles.signInContainer}>
                <Text style={styles.signInText}>Back to </Text>
                <Link href="/auth/login" asChild>
                    <TouchableOpacity>
                        <Text style={styles.signInLink}>Sign In</Text>
                    </TouchableOpacity>
                </Link>
            </View>

            {loading && <ActivityIndicator size="large" color="#6200EE" style={styles.loading} />}
            {message && <Text style={styles.successText}>{message}</Text>}
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#666',
        marginBottom: 24,
    },
    input: {
        backgroundColor: '#F5F6FA',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 14,
        marginBottom: 16,
        fontSize: 16,
        color: '#000',
        height: 44,
        width: '100%',
    },
    actionButton: {
        backgroundColor: '#6200EE',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        height: 50,
        marginBottom: 16,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signInText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666',
    },
    signInLink: {
        fontSize: 14,
        fontWeight: '700',
        color: '#6200EE',
    },
    loading: {
        marginTop: 16,
    },
    successText: {
        color: 'green',
        fontSize: 14,
        marginTop: 16,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 16,
        textAlign: 'center',
    },
});
