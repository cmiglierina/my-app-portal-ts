import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../statemanagement/storehooks';
import { logout } from '../../statemanagement/slices/AuthSlice';



function TopBar() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleLogut = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate('/login');

    }

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/home">Agm Portal</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">Admin</Nav.Link>
                        <Nav.Link href="/logout" onClick={handleLogut}>Logout</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopBar;