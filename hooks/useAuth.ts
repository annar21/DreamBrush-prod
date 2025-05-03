import { useSelector } from 'react-redux';
import { useAppDispatch } from './useAppDispatch';
import {RootState} from "@/store";
import {login, logout, register} from "@/store/authSlice"; // Use typed dispatch

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
