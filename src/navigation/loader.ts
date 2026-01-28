import { getUserById } from './../service/UserService';
import secureLocalStorage from "react-secure-storage";


export async function loadUser() {
    const iduser = secureLocalStorage.getItem('userid');
    if ( iduser && typeof iduser === 'number' ) {
        return {records : await getUserById(Number(iduser)) }
    }
    return {records:undefined};
}