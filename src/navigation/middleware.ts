import { redirect } from "react-router";
import secureLocalStorage from "react-secure-storage";
import AuthorizationService from "../service/auth/authorizationservice";
import type { User } from "../model/user";
import { getUserFromStorage } from "../utils/utils";

export async function authMiddleware() {
    const token = secureLocalStorage.getItem('token');
    const expiereAtJson = secureLocalStorage.getItem('expiereAt') as string;
    if (!token || !expiereAtJson) {
        throw redirect('/login');
    }

    const expireAtStr = JSON.parse(expiereAtJson);
    const expireAt = new Date(expireAtStr);
    if (Date.now() > expireAt.getTime()) {
        throw redirect('/login');
    }

    if (expireAt.getTime() - Date.now() < 3000) {
        const authuser = getUserFromStorage() as User;
        if (authuser) {
            try {
                const resp = await AuthorizationService.refreshToken(authuser.email);
                secureLocalStorage.setItem('expiereAt', JSON.stringify(resp.payload?.expires_in));
                secureLocalStorage.setItem('token', resp.payload!.access_token);
            } catch (error) {
                console.log('error in refresh token',error)
                throw redirect('/login');
            }
        } else {
            throw redirect('/login');
        }
        
    }
}


export function clearSession() {
    secureLocalStorage.clear();
}