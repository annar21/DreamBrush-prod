import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useColorScheme } from '@/hooks/useColorScheme';
import store from '@/store';
import { Provider } from 'react-redux';
import { validateToken } from '@/store/authSlice';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });
    const { user } = useSelector((state: any) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const loadToken = async () => {
            try {
                await dispatch(validateToken()).unwrap();
            } catch (err) {
                // Token validation failed; no action needed since token is cleared in thunk
            } finally {
                if (loaded) {
                    SplashScreen.hideAsync();
                }
            }
        };

        if (loaded) {
            loadToken();
        }
    }, [loaded, dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack screenOptions={{ headerShown: false }}>
                    {user ? (
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    ) : (
                        <>
                            <Stack.Screen name="auth/login" options={{ headerShown: false }} />
                            <Stack.Screen name="auth/register" options={{ headerShown: false }} />
                            <Stack.Screen name="auth/reset-password" options={{ headerShown: false }} />
                        </>
                    )}
                    <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="auto" />
            </ThemeProvider>
        </Provider>
    );
}
