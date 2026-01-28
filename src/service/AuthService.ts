import type { PingMessage } from './../model/authmodelst';
import { type AuthRequest, type AuthResponse, type Pingresp } from '../model/authmodelst';
import { type RestConfig, type RestResponse } from './../utils/restutils';
import callRestApi from "../utils/restutils";
import type { User } from '../model/user';



/**
 * @description method to check token validity to be used in page with no loader.
 */
export const ping = async () => {
    const url = import.meta.env.VITE_TODO_API_BASEURL + '/auth/ping';

    const pingresponse : Pingresp = {
        esito : false
    }


    const config: RestConfig<void, PingMessage> = {
            onSuccess(response) {
                if (response.esito) {
                    const users = response.payload;
                    if (users) {
                        pingresponse.pingMessage = users;
                        pingresponse.esito = true;
                    } else {
                        pingresponse.esito = false;
                        pingresponse.message = 'errore';
                    }
                } else {
                    pingresponse.esito = false;
                    pingresponse.message = response.errormessage ? response.errormessage : 'Errore recupero lista utenti';
                    pingresponse.status = response.status;
                }
    
            },
            onError(response) {
                pingresponse.esito = false;
                pingresponse.message = response.errormessage;
                pingresponse.status = response.status;
            },
        }
        await callRestApi(url, 'GET', config, true);
        return pingresponse;
}

export const login = async (user: AuthRequest) => {
    const url = import.meta.env.VITE_TODO_API_BASEURL + '/auth/generateToken';
    const serviceResponse: AuthResponse = {
        esito: false,
        status: -1

    };
    const config: RestConfig<AuthRequest, AuthResponse> = {
        data: user,
        onSuccess: (response: RestResponse<AuthResponse>) => {

            serviceResponse.esito = response.status == 200;
            serviceResponse.status = response.status;

            if (response.status == 200) {
                serviceResponse.user = response.payload?.user;
                serviceResponse.token = response.payload?.token;
            } else {
                serviceResponse.message = response.errormessage;
            }
        },
        onError: (response: RestResponse<AuthResponse>) => {

            serviceResponse.esito = false;
            serviceResponse.status = -1;
            serviceResponse.message = response.errormessage;

        }

    }

    await callRestApi(url, 'POST', config);
    return serviceResponse;

}


export const register = async (user: User) => {
    const url = import.meta.env.VITE_TODO_API_BASEURL + '/auth/addNewUser';
    const serviceResponse: AuthResponse = {
        esito: false,
        status: -1

    };

    const config: RestConfig<User, string> = {
        data: user,
        onSuccess(response) {
            serviceResponse.esito = response.status == 200;
            serviceResponse.status = response.status;
            if ( !serviceResponse.esito ) {
                serviceResponse.message = response.errormessage;
            }
        },
        onError(response) {
            serviceResponse.esito = false;
            serviceResponse.status = -1;
            serviceResponse.message = response.errormessage;
        },
    }

    await callRestApi(url, 'POST', config);
    return serviceResponse;
}