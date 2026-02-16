export interface RestResponse<T> {
    esito: boolean,
    payload?: T,
    errormessage?: string,
    status: number
}
