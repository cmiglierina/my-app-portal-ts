export interface User {
    id : string,
    email : string,
    firstName ?: string,
    lastName ?: string,
    username ?: string,
    rolesstring ?: string,
    roles ?: string[],
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