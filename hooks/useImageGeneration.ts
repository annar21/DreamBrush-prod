import { useState } from 'react';
import axios, { AxiosError } from 'axios'; // Import AxiosError
import { BACKEND_URL } from '../constants/config';

interface ImageGenerationResult {
    imageUrl: string | null;
    loading: boolean;
    error: string;
}

// Define the shape of the error response (optional, but recommended for clarity)
interface ErrorResponse {
    error: string;
}

export const useImageGeneration = (user: any) => {
    const [result, setResult] = useState<ImageGenerationResult>({
        imageUrl: null,
        loading: false,
        error: '',
    });

    const generateImage = async (prompt: string) => {
        if (!user) return;
        setResult({ ...result, loading: true, error: '' });
        try {
            const token = await user.getIdToken();
            const response = await axios.post(
                `${BACKEND_URL}/generate-image`,
                { prompt, userId: user.uid },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setResult({ imageUrl: response.data.imageUrl, loading: false, error: '' });
            return response.data.imageUrl;
        } catch (err) {
            // Type the error as AxiosError with an optional ErrorResponse
            const axiosError = err as AxiosError<ErrorResponse>;
            setResult({
                imageUrl: null,
                loading: false,
                error: axiosError.response?.data?.error || 'Failed to generate image',
            });
            throw err;
        }
    };

    return { ...result, generateImage };
};