import type { ReactNode } from "react";
import type { User } from "../../model/user";
import userService from "../../service/user/userservice";



export interface ProtectedComponentProps {
    children: ReactNode,
    roles: string[],
    user: User
}



function ProtectedComponent(props : Readonly<ProtectedComponentProps>) {
    
    if ( !userService.hasRoles(props.user, props.roles)) {
        return (<></>);
    }

    return (<>{props.children}</>)

}

export default ProtectedComponent;