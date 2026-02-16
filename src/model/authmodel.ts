import type { User } from "./user"

export interface AuthRequest {
    email : string,
    password : string,
    firstName ?: string,
    lastName ?: string
}

export interface AuthResponse {
    message ?:string,
    user ?: User,
    token ?: string,
    access_token ?: string,
    expires_in ?: Date,
    token_type ?: string,
    esito : boolean,
    status : number
}

export interface RefreshTokenResponse {
    access_token : string,
    expires_in : Date,
    token_type : string,
    message :string,
}

export interface PasswordForgottenRequest {
    email : string
}

export interface PasswordResetMessage {
    message: string
}

export interface PasswordResetRequest {
    email : string,
    password : string,
    confirmPassword : string,
    token : string
}
