import { createBrowserRouter } from "react-router";
import App from '../App'
import Home from "../pages/home/Home";
import UserList from "../pages/userlist/UserList";
import Login from "../pages/auth/Login";
import Registration from "../pages/auth/Registration";
import UserPage from "../pages/user/User";
import { authMiddleware, clearSession } from "./middleware";
import { getAllUSer } from "../service/UserService";
import { loadUser } from "./loader";
import { ping } from "../service/AuthService";


const router = createBrowserRouter([
    {
        Component: App,
        middleware: [authMiddleware],
        children : [
            {
                path : '/',
                Component : Home,
                loader : async () => {
                    return { records: await ping()}
                }
            },
            {
                path : '/home',
                Component : Home,
                loader : async () => {
                    return { records: await ping()}
                }
            },
            {
                path : '/users',
                Component : UserList,
                loader : async () => {
                    return { records: await getAllUSer()}
                }
            },
            {
                path : '/user',
                Component : UserPage,
                loader : loadUser
            }
        ]
    },
    {
        path : '/login',
        Component : Login,
        middleware : [clearSession]
        
    },
    {
        path : '/registration',
        Component : Registration,
        middleware : [clearSession]
    }
]);

export default router;