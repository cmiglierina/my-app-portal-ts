import callRestApi, { type FetchData } from '../../utils/javastarterpackapi';
import type { RestResponse } from '../../utils/restutils';
import type { AuthRequest, AuthResponse, PasswordForgottenRequest, PasswordResetMessage, PasswordResetRequest, RefreshTokenResponse } from '../../model/authmodel';


interface AuthService {
    registerNewUser: (request: AuthRequest) => Promise<RestResponse<AuthResponse>>,
    login: (request: AuthRequest) => Promise<RestResponse<AuthResponse>>,
    refreshToken: (email: string) => Promise<RestResponse<RefreshTokenResponse>>,
    forgotPassword: (request: PasswordForgottenRequest)=> Promise<RestResponse<PasswordResetMessage>>,
    resetPassword:(request: PasswordResetRequest)=> Promise<RestResponse<PasswordResetMessage>>,
}

async function refreshToken(email: string) {
    // RefreshTokenResponse
    const url = import.meta.env.VITE_JAVA_STARTER_PACK_API_BASEURL + '/api/auth/refresh-token?' + email;
    const data: FetchData<string> = {
        method: 'POST',
        data: '',
        includeCredential: true
    };
    const response = await callRestApi<string, RefreshTokenResponse>(url, data);

    return response;
}

async function registerNewUser(request: AuthRequest) {
    const url = import.meta.env.VITE_JAVA_STARTER_PACK_API_BASEURL + '/api/auth/register';
    const data: FetchData<AuthRequest> = {
        method: 'POST',
        data: request,
        includeCredential: false
    };
    const response = await callRestApi<AuthRequest, AuthResponse>(url, data);

    return response;
}

async function login(request: AuthRequest) {
    const url = import.meta.env.VITE_JAVA_STARTER_PACK_API_BASEURL + '/api/auth/login';
    const data: FetchData<AuthRequest> = {
        method: 'POST',
        data: request,
        includeCredential: false
    };
    const response = await callRestApi<AuthRequest, AuthResponse>(url, data);
    return response;
}

async function forgotPassword(request: PasswordForgottenRequest) {
    const url = import.meta.env.VITE_JAVA_STARTER_PACK_API_BASEURL + '/api/auth/forgot-password';
    const data: FetchData<PasswordForgottenRequest> = {
        method: 'POST',
        data: request,
        includeCredential: false
    };
    const response = await callRestApi<PasswordForgottenRequest, PasswordResetMessage>(url, data);
    return response;
}

async function resetPassword(request: PasswordResetRequest) {
    const url = import.meta.env.VITE_JAVA_STARTER_PACK_API_BASEURL + '/api/auth/reset-password';
    const data: FetchData<PasswordResetRequest> = {
        method: 'POST',
        data: request,
        includeCredential: false
    };
    const response = await callRestApi<PasswordResetRequest, PasswordResetMessage>(url, data);
    return response;
}

const AuthorizationService: AuthService = {
    registerNewUser: registerNewUser,
    login: login,
    refreshToken,
    forgotPassword,
    resetPassword
}


export default AuthorizationService;