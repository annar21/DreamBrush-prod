import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import {Link, useRouter} from "expo-router/build/rsc/exports";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { signUp, user } = useAuth();
    const router = useRouter();

    const handleRegister = async () => {
        setLoading(true);
        setError('');
        try {
            await signUp(email, password);
            router.replace('/(tabs)');
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again.');
        }
        setLoading(false);
    };

    if (user) {
        router.replace('/(tabs)');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create an account</Text>
            <Text style={styles.subtitle}>Enter your details below to get started.</Text>

            <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={secureText}
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setSecureText(!secureText)}>
                    <Ionicons name={secureText ? 'eye-off' : 'eye'} size={20} color="#999" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.createButton} onPress={handleRegister} disabled={loading}>
                <Text style={styles.createButtonText}>CREATE ACCOUNT</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.appleButton} disabled={loading}>
                <Ionicons name="logo-apple" size={20} color="#fff" style={styles.appleIcon} />
                <Text style={styles.appleButtonText}>Continue with Apple</Text>
            </TouchableOpacity>

            <View style={styles.signInContainer}>
                <Text style={styles.signInText}>Already have an account? </Text>
                <Link href="/auth/login" asChild>
                    <TouchableOpacity>
                        <Text style={styles.signInLink}>Sign in</Text>
                    </TouchableOpacity>
                </Link>
            </View>

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
    input: {
        backgroundColor: '#F5F6FA',
        borderRadius: 8,
        paddingHorizontal: 14,
        marginBottom: 16,
        fontSize: 16,
        color: '#000',
        height: 44,
        width: '100%',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        height: 44,
        width: '100%',
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute',
        right: 14,
        top: '50%',
        transform: [{ translateY: -10 }],
    },
    createButton: {
        backgroundColor: '#6200EE',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        height: 50,
        marginBottom: 16,
    },
    createButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    appleButton: {
        flexDirection: 'row',
        backgroundColor: '#000',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        marginBottom: 16,
    },
    appleIcon: {
        marginRight: 8,
    },
    appleButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
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
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 16,
        textAlign: 'center',
    },
});
