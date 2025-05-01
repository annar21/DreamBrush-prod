import { View, Text, Button, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import { BACKEND_URL } from '../constants/config';
import { useAuth } from '../hooks/useAuth';

export default function Subscription() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState<boolean>(false);
    const [subscriptionStatus, setSubscriptionStatus] = useState<string>('free');
    const [error, setError] = useState<string>('');
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            checkSubscriptionStatus();
        }
    }, [user]);

    const checkSubscriptionStatus = async () => {
        try {
            const token = await user.getIdToken();
            const response = await axios.get(`${BACKEND_URL}/subscription-status`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSubscriptionStatus(response.data.status);
        } catch (err) {
            console.error('Error checking subscription:', err);
        }
    };

    const subscribe = async () => {
        setLoading(true);
        setError('');
        try {
            const token = await user.getIdToken();
            const response = await axios.post(
                `${BACKEND_URL}/create-checkout-session`,
                { userId: user.uid },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const { paymentIntent, ephemeralKey, customer } = response.data;

            // Initialize the payment sheet with the correct parameters
            const { error: initError } = await initPaymentSheet({
                merchantDisplayName: 'AI Image Generator', // Required
                customerId: customer,
                customerEphemeralKeySecret: ephemeralKey,
                paymentIntentClientSecret: paymentIntent, // Pass paymentIntentClientSecret directly
            });

            if (initError) {
                setError(`Payment sheet initialization failed: ${initError.message}`);
                setLoading(false);
                return;
            }

            const { error: paymentError } = await presentPaymentSheet();
            if (paymentError) {
                setError(`Payment failed: ${paymentError.message}`);
            } else {
                await axios.post(
                    `${BACKEND_URL}/confirm-subscription`,
                    { userId: user.uid },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setSubscriptionStatus('premium');
            }
        } catch (err) {
            setError('Failed to process subscription');
        }
        setLoading(false);
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>
                Current Plan: {subscriptionStatus === 'premium' ? 'Premium' : 'Free'}
            </Text>
            {subscriptionStatus === 'free' && (
                <Button title="Subscribe to Premium" onPress={subscribe} disabled={loading || !user} />
            )}
            {loading && <ActivityIndicator size="large" />}
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
            <Text style={{ marginTop: 20 }}>
                Free Plan: 5 images/month{'\n'}
                Premium Plan: Unlimited images
            </Text>
        </View>
    );
}
