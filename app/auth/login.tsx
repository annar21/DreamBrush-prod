import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react'; // Add useEffect
import { useAuth } from '../../hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { signIn, user } = useAuth();
    const router = useRouter();

    // Handle navigation when user is logged in
    useEffect(() => {
        if (user) {
            router.replace('/(tabs)');
        }
    }, [user, router]); // Run when user or router changes

    const handleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            await signIn(email, password);
            // No need to navigate here; useEffect will handle it
        } catch (err: any) {
            setError(err.message || 'Login failed. Please try again.');
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.subtitle}>Enter your credentials to continue.</Text>

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

            <TouchableOpacity style={styles.actionButton} onPress={handleLogin} disabled={loading}>
                <Text style={styles.actionButtonText}>SIGN IN</Text>
            </TouchableOpacity>

            <Link href="/auth/reset-password" asChild>
                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
            </Link>

            <View style={styles.signInContainer}>
                <Text style={styles.signInText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/auth/register')}>
                    <Text style={styles.signInLink}>Sign up</Text>
                </TouchableOpacity>
            </View>

            {loading && <ActivityIndicator size="large" color="#6200EE" style={styles.loading} />}
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

// Styles remain unchanged
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
    forgotPassword: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6200EE',
        textAlign: 'center',
        marginBottom: 16,
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
