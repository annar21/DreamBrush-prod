import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'expo-router';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleResetPassword = async () => {
        setLoading(true);
        setError('');
        setMessage('');
        try {
            // Assuming there's a resetPassword method in useAuth
            // await resetPassword(email);
            setMessage('Reset link sent! Check your email.');
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to send reset link. Please try again.';
            setError(errorMessage);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>Enter your email to receive a reset link.</Text>

            <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#999"
                value="dfsgdsgdsg"
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TouchableOpacity
                style={styles.actionButton}
                onPress={handleResetPassword}
                disabled={loading}
            >
                <Text style={styles.actionButtonText}>SEND RESET LINK</Text>
            </TouchableOpacity>

            <View style={styles.signInContainer}>
                <Text style={styles.signInText}>Back to </Text>
                <TouchableOpacity onPress={() => router.push('/auth/login')}>
                    <Text style={styles.signInLink}>Sign In</Text>
                </TouchableOpacity>
            </View>
sdfdsf
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
