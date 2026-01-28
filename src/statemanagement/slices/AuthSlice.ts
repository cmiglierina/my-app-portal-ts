import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../../model/user";
import { login, register } from "../../service/AuthService";
import type { AuthRequest } from "../../model/authmodelst";
import { toast } from "react-toastify";
import  secureLocalStorage  from  "react-secure-storage";

export interface AuthState {
    user?: User,
    loginErrormessage?: string,
    registrationErrormessage?: string,
    isAuthenticated: boolean,
    isLoading: boolean
}

const initialAuthState: AuthState = {
    isLoading: false,
    isAuthenticated: false
}


export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData: AuthRequest, thunkApi) => {
        try {
            const response = await login({ username: userData.username, password: userData.password });
            if (!response.esito) {
                return thunkApi.rejectWithValue({ message: response.message });
            }
            if (response.token) {
                secureLocalStorage.setItem('token', response.token);
                if (response.user?.id)
                    secureLocalStorage.setItem('userid',response.user.id);
            }

            return response.user;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const registerNewUser = createAsyncThunk(
    'auth/register',
    async (userData: User, thunkApi) => {
        try {
            
            const response = await register(userData);
            if (!response.esito) {
                return thunkApi.rejectWithValue({ message: response.message });
            }

            return true;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);


export const authSlice = createSlice(
    {
        name: 'auth',
        initialState: initialAuthState,
        reducers: {
            logout: (state: AuthState) => {
                state.isAuthenticated = false;
                state.isLoading = false;
                secureLocalStorage.removeItem('token');
                secureLocalStorage.removeItem('userid');
            },
            loginFailure: (state: AuthState, action) => {
                state.isAuthenticated = false;
                state.isLoading = false;
                state.loginErrormessage = action.payload;
                secureLocalStorage.removeItem('token');
                secureLocalStorage.removeItem('userid');
                toast.error(action.payload);

            },
            registrationFailure: (state: AuthState, action) => {
                state.isAuthenticated = false;
                state.isLoading = false;
                state.registrationErrormessage = action.payload;
                toast.error(action.payload);

            },
        },
        extraReducers: (builder) => {
            builder.addCase(loginUser.pending, (state: AuthState) => {
                state.isLoading = true;
                state.loginErrormessage = undefined;
            }
            ).addCase(loginUser.fulfilled, (state: AuthState, action) => {
                state.isLoading = false;
                state.loginErrormessage = undefined;
                state.user = action.payload;
                state.isAuthenticated = true;
            }).addCase(loginUser.rejected, (state: AuthState) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.loginErrormessage = 'Login failed';
                secureLocalStorage.removeItem('token');
                secureLocalStorage.removeItem('userid');
            }).addCase(registerNewUser.pending, (state: AuthState) => {
                state.isLoading = true;
                state.registrationErrormessage = undefined;
            }
            ).addCase(registerNewUser.fulfilled, (state: AuthState) => {
                state.isLoading = false;
                state.registrationErrormessage = undefined;
                state.isAuthenticated = true;
            }).addCase(registerNewUser.rejected, (state: AuthState) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.registrationErrormessage = 'Signup failed';
            });
        }
    }
);

export const { logout, loginFailure, registrationFailure } = authSlice.actions;

export default authSlice.reducer;