import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'expo-router';
import { auth } from '../../services/firebase';
import api from '../../services/api';
import Button from '@/components/Button';
import Input from '@/components/Input';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            // Authenticate with Firebase
            await login(email, password);
            const user = auth.currentUser;
            const idToken = await user?.getIdToken();

            // Send ID token to backend
            const response = await api.post('/auth/login', { idToken });
            console.log('Backend response:', response.data);

            // Navigate to main app
            router.replace('/(tabs)');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to login. Please try again.';
            setError(errorMessage);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.subtitle}>Enter your credentials to access your account.</Text>

            <Input
                placeholder="Email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />

            <Button title="SIGN IN" onPress={handleLogin} disabled={loading} />

            <View style={styles.signInContainer}>
                <Text style={styles.signInText}>Don't have an account? </Text>
                <Text style={styles.signInLink} onPress={() => router.push('/auth/register')}>
                    Sign Up
                </Text>
            </View>

            <Text style={styles.signInLink} onPress={() => router.push('/auth/reset-password')}>
                Forgot Password?
            </Text>

            {loading && <ActivityIndicator size="large" color="#6200EE" style={styles.loading} />}
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
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
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
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 16,
        textAlign: 'center',
    },
});
