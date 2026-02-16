import { createBrowserRouter } from "react-router";
import App from '../App'
import Home from "../pages/home/Home";
import UserList from "../pages/userlist/UserList";
import Login from "../pages/auth/Login";
import Registration from "../pages/auth/Registration";
import UserPage from "../pages/user/User";
import { authMiddleware, clearSession } from "./middleware";
import { loadAllUser, loadUser } from "./loader";
import ForgottenPassword from "../pages/auth/ForgottenPassword";
import RefreshPassword from "../pages/auth/RefreshPassword";


const router = createBrowserRouter([
    {
        Component: App,
        middleware: [authMiddleware],
        children : [
            {
                path : '/',
                Component : Home
            },
            {
                path : '/home',
                Component : Home
            },
            {
                path : '/users',
                Component : UserList,
                loader :loadAllUser
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
    },
    {
        path : '/forgot-password',
        Component : ForgottenPassword,
        middleware : [clearSession]
    },
    {
        path : '/reset-password',
        Component : RefreshPassword,
        middleware : [clearSession]
    }
]);

export default router;