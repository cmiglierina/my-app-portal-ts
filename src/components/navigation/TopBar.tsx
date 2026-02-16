import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../statemanagement/storehooks';
import { logout, setAuthUser } from '../../statemanagement/slices/AuthSlice';
import { getUserFromStorage } from '../../utils/utils';
import { useEffect } from 'react';
import type { User } from '../../model/user';
import { NavDropdown } from 'react-bootstrap';



function TopBar() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    let authuser = useAppSelector(state => state.auth.user);
    if (!authuser) {
        authuser = getUserFromStorage() as User;
        if (authuser) {

            dispatch(setAuthUser(authuser));
        }
    }

    useEffect(() => {
        if (!authuser) {
            navigate('/login');
        }

        return () => {

        }
    })
    const handleLogut = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(logout());
        navigate('/login');

    }

    return (
        <Navbar collapseOnSelect variant='light' expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/home">Agm Portal</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title={authuser.username}
                            menuVariant="light"
                        >
                            <NavDropdown.Item href="/user">Dati utenza</NavDropdown.Item>
                            <NavDropdown.Item href="/logout" onClick={handleLogut}>Logout</NavDropdown.Item>
                        </NavDropdown>


                        

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopBar;