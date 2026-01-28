import { redirect } from "react-router";
import secureLocalStorage from "react-secure-storage";

export function authMiddleware() {
    const token = secureLocalStorage.getItem('token');
    if (!token) {
        throw redirect('/login');
    }
}

export function clearSession() {
    secureLocalStorage.removeItem('token');
    secureLocalStorage.removeItem('userid');
}