import secureLocalStorage from "react-secure-storage";

export interface RestResponse<T> {
    esito: boolean,
    payload?: T,
    errormessage?: string,
    status: number
}

export interface RestConfig<I, T> {
    data?: I,
    onSuccess: (response: RestResponse<T>) => void,
    onError: (response: RestResponse<T>) => void,
}

function createHeader() {
    const headers = new Headers({
        "Content-Type": "application/json",
        "Accept": "application/json"
    });
    const token = secureLocalStorage.getItem('token');
    if (token) {
        if (typeof token === 'string') {
            headers.append('Authorization', 'Bearer ' + token);
        }
    }
    return headers;

}

export default async function callRestApi<I, T>(url: string, method: string, opt: RestConfig<I, T>, includecredenzial?: boolean) {
    const headers = createHeader();
    const options: RequestInit = {
        method: method,
        headers: headers
    };

    if (method == 'POST' || method == 'PUT' || method == 'PATCH') {
        options.body = JSON.stringify(opt.data);
    }

    if (includecredenzial) {
        options.credentials = 'include'
    }



    try {
        await fetch(url, options).then(async (response) => {

            if (response.ok) {
                await manakeOkResponse<I, T>(response, opt);


            } else {

                manageKoResponse<I, T>(response, opt);

            }
        }).catch(e => {
            const restResponse: RestResponse<T> = {
                payload: e.message,
                esito: false,
                status: -1
            };
            opt.onError(restResponse);
        });
    } catch (error) {
        const restResponse: RestResponse<T> = {
            errormessage: error instanceof Error ? error.message : 'Errore in chiamata al BE',
            esito: false,
            status: -1
        };
        opt.onError(restResponse);
    }
}

function manageKoResponse<I, T>(response: Response, opt: RestConfig<I, T>) {
    const restResponse: RestResponse<T> = {
        esito: false,
        status: response.status,
        errormessage: "Errore nella chiamata api " + response.status
    };

    opt.onError(restResponse);
}

async function manakeOkResponse<I, T>(response: Response, opt: RestConfig<I, T>) {
    const payload = await response.json();
    const restResponse: RestResponse<T> = {
        payload: payload,
        esito: true,
        status: 200
    };
    opt.onSuccess(restResponse);
}


async function refreshToken() {
    const urlRefresh = import.meta.env.VITE_TODO_API_BASEURL + '/api/user';
}