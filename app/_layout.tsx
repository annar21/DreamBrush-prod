import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, createContext, useContext } from 'react';
import 'react-native-reanimated';
import { useSelector, Provider } from 'react-redux';
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { validateToken } from "@/store/authSlice";
import store from "@/store";

// Prevent splash screen auto-hide
SplashScreen.preventAutoHideAsync();

// Create AuthContext
interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Component
function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useSelector((state: any) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await dispatch(validateToken()).unwrap();
            } catch (err) {
                // Token validation failed
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [dispatch]);

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook to use auth context
function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// RootLayout Component
export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <AuthProvider>
                <ProtectedLayout />
            </AuthProvider>
        </Provider>
    );
}

// ProtectedLayout Component
function ProtectedLayout() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return null; // Or a loading component
    }

    return (
        <>
            <Stack screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                ) : (
                    [
                        <Stack.Screen key="login" name="auth/login" options={{ headerShown: false }} />,
                        <Stack.Screen key="register" name="auth/register" options={{ headerShown: false }} />,
                        <Stack.Screen key="reset-password" name="auth/reset-password" options={{ headerShown: false }} />,
                    ]
                )}
                <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
        </>
    );
}
