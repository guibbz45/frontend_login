import { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router';
import { jwtDecode } from 'jwt-decode';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../AuthProvider';

const Header = () => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
    const { logout } = useAuth();

    /* Verify if User In-Session in LocalStorage */
    useEffect(() => {
        const fetchDecodedUserID = async () => {
            try {
                const access_token = localStorage.getItem('access_token');
                // setUser(response.data);

                const decoded_token = jwtDecode(access_token);
                setUser(decoded_token);
            } catch (error) {
                console.log(error)
                navigate('/login');
            }
        };

        fetchDecodedUserID();
    }, []);

    /* Performs Logout Method */
    const handleLogout = async () => {
        try {
            logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
            <Navbar.Brand href="/">AUTHENTECH</Navbar.Brand>
            <Nav className="me-auto">
                <NavLink className ="nav-link"to="/users">Users</NavLink>
                <Nav.Link href="#departments">Departments</Nav.Link>
                <Nav.Link href="#courses">Courses</Nav.Link>
            </Nav>

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <NavDropdown
                        title={user ? user.username : 'Dropdown'}
                        id="basic-nav-dropdown"
                        align="start"
                    >
                        <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                        <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
                        <NavDropdown.Item href="#" onClick={handleLogout}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
};

export default Header;
