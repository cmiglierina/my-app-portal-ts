import type { User } from "./user"

export interface AuthRequest {
    username : string,
    password : string
}

export interface AuthResponse {
    message ?:string,
    user ?: User,
    token ?: string,
    esito : boolean,
    status : number
}

export interface PingMessage {
    message : string
}
export interface Pingresp {
    pingMessage ?: PingMessage,
    message ?:string,
    esito :boolean,
    status ?: number    
}