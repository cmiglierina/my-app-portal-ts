import { createBrowserRouter } from "react-router";
import App from '../App'
import Home from "../pages/home/Home";


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
            }
        ]
    }
]);

export default router;