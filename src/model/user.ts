export interface User {
    id ?: number,
    email : string,
    name ?: string,
    surname ?: string,
    phone ?: string,
    roles ?: string,
    password  ?: string
}

export interface UserListResp {
    userlist ?: User[],
    message ?:string,
    esito :boolean,
    status ?: number    
}

export interface UserResp {
    user ?: User,
    message ?:string,
    esito :boolean,
    status ?: number    
}