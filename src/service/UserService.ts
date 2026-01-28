import { type RestConfig } from './../utils/restutils';
import callRestApi from "../utils/restutils";
import type { User, UserListResp, UserResp } from '../model/user';




export const getAllUSer = async () => {
    const url = import.meta.env.VITE_TODO_API_BASEURL + '/api/user';
    const resp: UserListResp = {
        esito: false
    }
    const config: RestConfig<void, User[]> = {
        onSuccess(response) {
            if (response.esito) {
                const users = response.payload;
                if (users) {
                    resp.userlist = users;
                    resp.esito = true;
                } else {
                    resp.esito = false;
                    resp.message = 'no users found';
                }
            } else {
                resp.esito = false;
                resp.message = response.errormessage ? response.errormessage : 'Errore recupero lista utenti';
                resp.status = response.status;
            }

        },
        onError(response) {
            resp.esito = false;
            resp.message = response.errormessage;
            resp.status = response.status;
        },
    }
    await callRestApi(url, 'GET', config, true);

    return resp;
};

export const getUserById = async (id: number) => {
    const url = import.meta.env.VITE_TODO_API_BASEURL + '/api/user/' + id;
    const resp: UserResp = {
        esito: false
    }
    const config: RestConfig<void, User> = {
        onSuccess(response) {
            if (response.esito) {
                const users = response.payload;
                if (users) {
                    resp.user = users;
                    resp.esito = true;
                } else {
                    resp.esito = false;
                    resp.message = 'no users found';
                }
            } else {
                resp.esito = false;
                resp.message = response.errormessage ? response.errormessage : 'Errore recupero utente';
                resp.status = response.status;
            }

        },
        onError(response) {
            resp.esito = false;
            resp.message = response.errormessage;
            resp.status = response.status;
        },
    }
    await callRestApi(url, 'GET', config, true);

    return resp;
};

export async function updateUser(user: User) {
    const url = import.meta.env.VITE_TODO_API_BASEURL + '/api/user';
    const resp: UserResp = {
        esito: false
    }
    const config: RestConfig<User, User> = {
        data: user,
        onSuccess(response) {
            if (response.esito) {
                const users = response.payload;
                if (users) {
                    resp.user = users;
                    resp.esito = true;
                } else {
                    resp.esito = false;
                    resp.message = 'no users found';
                }
            } else {
                resp.esito = false;
                resp.message = response.errormessage ? response.errormessage : 'Errore salvataggio utente';
                resp.status = response.status;
            }

        },
        onError(response) {
            resp.esito = false;
            resp.message = response.errormessage;
            resp.status = response.status;
        },
    }
    await callRestApi(url, 'POST', config, true);

    return resp;
}