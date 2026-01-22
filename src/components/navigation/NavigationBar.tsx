import './NavigationBar.css'

import { NavLink } from "react-router";
import Stack from 'react-bootstrap/Stack';


function NavigationBar() {

    return (

        <Stack gap={0}>

            <div className="div-menu">
                <NavLink to='/home' className="btn btn-primary nav-btn"><i className="bi bi-house"></i> Home</NavLink>
            </div>
            <div className="div-menu">
                <NavLink to='/user' className="btn btn-primary nav-btn"><i className="bi bi-person"></i> User</NavLink>
            </div>
            <div className="div-menu">
                <NavLink to='/users' className="btn btn-primary nav-btn"><i className="bi bi-people"></i> Lista utenti</NavLink>
            </div>
        </Stack>


    );
}

export default NavigationBar