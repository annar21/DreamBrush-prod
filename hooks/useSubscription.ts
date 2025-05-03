import { useState, useEffect } from 'react';
import axios from 'axios';
import { useStripe } from '@stripe/stripe-react-native';
import { BACKEND_URL } from '../constants/config';

interface SubscriptionResult {
    status: string;
    loading: boolean;
    error: string;
    subscribe: () => Promise<void>;
}

export const useSubscription = (user: any): SubscriptionResult => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [status, setStatus] = useState<string>('free');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

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
            setStatus(response.data.status);
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
                paymentIntentClientSecret: paymentIntent, // Pass directly as a top-level parameter
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
                setStatus('premium');
            }
        } catch (err) {
            setError('Failed to process subscription');
        }
        setLoading(false);
    };

    return { status, loading, error, subscribe };
};