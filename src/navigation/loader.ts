
import secureLocalStorage from "react-secure-storage";
import UserService from "../service/user/userservice";


export async function loadUser() {
    const iduser = secureLocalStorage.getItem('userid');
    if ( iduser && typeof iduser === "string") {
        return {records : await UserService.getUserById(iduser) }
    }
    return {records:undefined};
}

export async function loadAllUser() {
    return {records : await UserService.getAllUSer() }
}