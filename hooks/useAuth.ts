import { useSelector } from 'react-redux';
import { useAppDispatch } from './useAppDispatch'; // Use typed dispatch
import { login, register, logout } from '../store/authSlice';
import { RootState } from '../store'; // Import RootState

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { user, token, loading, error } = useSelector((state: RootState) => state.auth);

    const signIn = async (email: string, password: string) => {
        await dispatch(login({ email, password })).unwrap();
    };

    const signUp = async (email: string, password: string) => {
        await dispatch(register({ email, password })).unwrap();
    };

    const signOut = () => {
        dispatch(logout());
    };

    return {
        user,
        token,
        loading,
        error,
        signIn,
        signUp,
        signOut,
    };
};
