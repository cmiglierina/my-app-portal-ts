
import type { User } from "../../model/user";
import type { FetchData } from "../../utils/javastarterpackapi";
import callRestApi from "../../utils/javastarterpackapi";
import type { RestResponse } from "../../utils/restutils";


export interface UserService {
    getUserById: (id: string) => Promise<RestResponse<User>>,
    deleteUserById: (id: string) => Promise<RestResponse<void>>,
    getAllUSer: () => Promise<RestResponse<User[]>>,
    updateUser: (user:User) => Promise<RestResponse<void>>,
    hasRoles: (user:User, roles:string[]) => boolean
}

async function getUserById(id: string) {
    const url = import.meta.env.VITE_JAVA_STARTER_PACK_API_BASEURL + '/api/users/' + id;
    const data: FetchData<void> = {
        method: 'GET',
        includeCredential: true
    };
    const response = await callRestApi<void, User>(url, data);
    console.log("getUserById response:  ",response)
    return response;
}

const getAllUSer = async () => {
    const url = import.meta.env.VITE_JAVA_STARTER_PACK_API_BASEURL + '/api/users';
    const data: FetchData<void> = {
        method: 'GET',
        includeCredential: true
    };
    const response = await callRestApi<void, User[]>(url, data);

    return response;
}

async function updateUser(user: User) {

    const url = import.meta.env.VITE_JAVA_STARTER_PACK_API_BASEURL + '/api/users/' + user.id;
    const data: FetchData<User> = {
        method: 'PUT',
        data : user,
        includeCredential: true
    };
    const response = await callRestApi<User, void>(url, data);
    return response;
}

async function deleteUserById(id:string) {
    const url = import.meta.env.VITE_JAVA_STARTER_PACK_API_BASEURL + '/api/users/' + id;
    const data: FetchData<void> = {
        method: 'DELETE',
        includeCredential: true
    };
    const response = await callRestApi<void, void>(url, data);
    return response
}

function hasRoles(user:User, roles:string[]) {
    if ( user.roles ) {
        let founded = false;
        roles.forEach((role) => {
            if ( user.roles?.includes(role)) {
                founded = true;
            }
        });
        return founded;
    }
    return false;
}

const userService: UserService = {
    getUserById,
    getAllUSer,
    updateUser,
    deleteUserById,
    hasRoles,
}

export default userService;