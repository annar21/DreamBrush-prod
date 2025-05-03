import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {validateToken} from "@/store/authSlice";
import store from "@/store";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
            <Stack screenOptions={{ headerShown: false }}>
                {user ? (
                    <Stack.Screen key="tabs" name="(tabs)" options={{ headerShown: false }} />
                ) : (
                    [
                        <Stack.Screen key="login" name="auth/login" options={{ headerShown: false }} />,
                        <Stack.Screen key="register" name="auth/register" options={{ headerShown: false }} />,
                        <Stack.Screen key="reset-password" name="auth/reset-password" options={{ headerShown: false }} />,
                    ]
                )}
                <Stack.Screen key="not-found" name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
        </Provider>
    );
}
