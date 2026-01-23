import { createBrowserRouter } from "react-router";
import App from '../App'
import Home from "../pages/home/Home";
import UserList from "../pages/userlist/UserList";
import Login from "../pages/auth/Login";
import Registration from "../pages/auth/Registration";
import UserPage from "../pages/user/User";

const router = createBrowserRouter([
    {
        Component: App,
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
                Component : UserList
            },
            {
                path : '/user',
                Component : UserPage
            }
        ]
    },
    {
        path : '/login',
        Component : Login
    },
    {
        path : '/registration',
        Component : Registration
    }
]);

export default router;