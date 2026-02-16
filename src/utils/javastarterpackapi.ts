import type { RestResponse } from './restutils';
import secureLocalStorage from "react-secure-storage";

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

export interface FetchData<T> {
    method: string,
    data?: T,
    includeCredential?: boolean
}

async function callRestApi<T, O>(url: string, fetchData: FetchData<T>) {
    const headers = createHeader();
    const options: RequestInit = {
        method: fetchData.method,
        headers: headers
    };


    if (fetchData.method == 'POST' || fetchData.method == 'PUT' || fetchData.method == 'PATCH') {
        options.body = JSON.stringify(fetchData.data);
    }

    if (fetchData.includeCredential) {
        options.credentials = 'include';
    }

    const restResponse: RestResponse<O> = {
        esito: false,
        status: -1
    }
    try {
        await fetch(url, options).then(
            async (response) => {
                restResponse.status = response.status;
                restResponse.esito = response.ok;

                if (response.ok) {
                    restResponse.payload = await response.json();
                } else {
                    const payload = await response.json();
                    restResponse.errormessage = payload || 'Error on calling api: ' + url;
                }
            }
        ).catch(
            (error_) => {
                restResponse.errormessage = error_.message || 'Error on calling api: ' + url;
                restResponse.status = 500;
            }
        );

    } catch (error) {
        console.log('errore in fetch ', error);
        restResponse.errormessage =  'Error on calling api: ' + url;
        restResponse.status = 500;
    }
    return restResponse;
}



export default callRestApi;