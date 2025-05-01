import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../services/firebase';
import Button from '../../components/Button';
import Input from '../../components/Input';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleResetPassword = async () => {
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess('Password reset email sent! Check your inbox.');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to send reset email. Please try again.';
            setError(errorMessage);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>Enter your email to receive a password reset link.</Text>

            <Input
                placeholder="Email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Button title="SEND RESET LINK" onPress={handleResetPassword} disabled={loading} />

            <Text style={styles.signInLink} onPress={() => router.push('/auth/login')}>
                Back to Sign In
            </Text>

            {loading && <ActivityIndicator size="large" color="#6200EE" style={styles.loading} />}
            {error && <Text style={styles.errorText}>{error}</Text>}
            {success && <Text style={styles.successText}>{success}</Text>}
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
    signInLink: {
        fontSize: 14,
        fontWeight: '700',
        color: '#6200EE',
        textAlign: 'center',
        marginTop: 16,
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
    successText: {
        color: 'green',
        fontSize: 14,
        marginTop: 16,
        textAlign: 'center',
    },
});
