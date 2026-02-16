import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../../model/user";
import type { AuthRequest, PasswordForgottenRequest, PasswordResetRequest } from "../../model/authmodel";
import { toast } from "react-toastify";
import secureLocalStorage from "react-secure-storage";
import AuthorizationService from "../../service/auth/authorizationservice";

export interface AuthState {
    user?: User,
    loginErrormessage?: string,
    registrationErrormessage?: string,
    isAuthenticated: boolean,
    isLoading: boolean,
    message?: string,
    isError : boolean
}

const initialAuthState: AuthState = {
    isLoading: false,
    isAuthenticated: false,
    isError : false
}


export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData: AuthRequest, thunkApi) => {
        try {
            const response = await AuthorizationService.login({ email: userData.email, password: userData.password });
            if (!response.esito) {
                return thunkApi.rejectWithValue({ message: response.errormessage });
            }
            secureLocalStorage.setItem('token', response.payload!.access_token!);
            secureLocalStorage.setItem('userid', response.payload!.user!.id);
            secureLocalStorage.setItem('user', JSON.stringify(response.payload!.user!));
            secureLocalStorage.setItem('expiereAt', JSON.stringify(response.payload!.expires_in!));

            return response.payload?.user;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const registerNewUser = createAsyncThunk(
    'auth/register',
    async (userData: AuthRequest, thunkApi) => {
        try {

            const response = await AuthorizationService.registerNewUser(userData);
            if (!response.esito) {
                return thunkApi.rejectWithValue({ message: response.errormessage });
            }

            return response;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const forgotPassowordReducer = createAsyncThunk(
    'auth/forgotpassword',
    async (requestPass: PasswordForgottenRequest, thunkApi) => {
        try {

            const response = await AuthorizationService.forgotPassword(requestPass);
            if (!response.esito) {
                return thunkApi.rejectWithValue({ message: response.errormessage });
            }

            return response;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const resetPassowordReducer = createAsyncThunk(
    'auth/resetpassword',
    async (requestPass: PasswordResetRequest, thunkApi) => {
        try {

            const response = await AuthorizationService.resetPassword(requestPass);
            if (!response.esito) {
                return thunkApi.rejectWithValue({ message: response.errormessage });
            }

            return response;
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
                secureLocalStorage.clear();
            },
            loginFailure: (state: AuthState, action) => {
                state.isAuthenticated = false;
                state.isLoading = false;
                state.loginErrormessage = action.payload;
                secureLocalStorage.clear();
                toast.error(action.payload);

            },
            registrationFailure: (state: AuthState, action) => {
                state.isAuthenticated = false;
                state.isLoading = false;
                state.registrationErrormessage = action.payload;
                toast.error(action.payload);

            },
            setAuthUser(state: AuthState, action) {
                state.user = action.payload;
            },
            updateAuthUser(state: AuthState, action) {
                if ( state.user){
                    state.user.firstName = action.payload.firstName;
                    state.user.lastName = action.payload.lastName;
                    state.user.username = action.payload.username;
                    state.user.email = action.payload.email;

                }

            }
        },
        extraReducers: (builder) => {
            builder.addCase(loginUser.pending, (state: AuthState) => {
                state.isLoading = true;
                state.loginErrormessage = undefined;
                state.isError = false;
            }
            ).addCase(loginUser.fulfilled, (state: AuthState, action) => {
                state.isLoading = false;
                state.loginErrormessage = undefined;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.isError = false;
            }).addCase(loginUser.rejected, (state: AuthState) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.loginErrormessage = 'Login failed';
                secureLocalStorage.clear();
            }).addCase(registerNewUser.pending, (state: AuthState) => {
                state.isLoading = true;
                state.registrationErrormessage = undefined;
                state.isError = false;
            }
            ).addCase(registerNewUser.fulfilled, (state: AuthState) => {
                state.isLoading = false;
                state.registrationErrormessage = undefined;
                state.isAuthenticated = false;
                state.isError = false;
            }).addCase(registerNewUser.rejected, (state: AuthState) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.registrationErrormessage = 'Signup failed';
            }).addCase(forgotPassowordReducer.pending, (state: AuthState) => {
                state.isLoading = true;
                state.message = undefined;
                state.isError = false;
            }
            ).addCase(forgotPassowordReducer.fulfilled, (state: AuthState,action) => {
                state.isLoading = false;
                state.message = action.payload.message;
                state.isError = false;
  
            }).addCase(forgotPassowordReducer.rejected, (state: AuthState,action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.isError = true;
                state.message = action.payload.message || 'Errore nel richiedere nuova password';
            }).addCase(resetPassowordReducer.pending, (state: AuthState) => {
                state.isLoading = true;
                state.message = undefined;
                state.isError = false;
            }
            ).addCase(resetPassowordReducer.fulfilled, (state: AuthState,action) => {
                state.isLoading = false;
                state.message = action.payload.message;
                state.isError = false;
  
            }).addCase(resetPassowordReducer.rejected, (state: AuthState,action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.isError = true;
                state.message = action.payload.message || 'Errore nel richiedere nuova password';
            });;
        }
    }
);

export const { logout, loginFailure, registrationFailure,setAuthUser,updateAuthUser

 } = authSlice.actions;

export default authSlice.reducer;