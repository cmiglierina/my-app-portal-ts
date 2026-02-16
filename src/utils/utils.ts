import { type User } from '../model/user'
import secureLocalStorage from "react-secure-storage";

export function getUserFromStorage():User|undefined {

    const authuserstorageStr = secureLocalStorage.getItem('user') as string;

    if (!authuserstorageStr) {
        return undefined;
    }
    const authuserstorage = JSON.parse(authuserstorageStr) as User;

    return authuserstorage;


}