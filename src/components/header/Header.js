
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NavDropdown } from 'react-bootstrap';
import { logOut } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogOut } from '../../redux/action/userAction';
import Languge from './Language';

const Header = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const account = useSelector(state => state.user.account);
    const dispath = useDispatch()
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('login')
    }

    const handleSignup = () => {
        navigate('register')
    }

    const handleLogOut = async () => {
        let res = await logOut("account.email", account.refresh_token);
        if (res && res.EC === 0) {
            //clear data redux
            dispath(doLogOut())

            navigate('/login')
        } else {
            toast.error(res.EM)
        }
        console.log('hieu toki check res: ', res)
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to="/" className='navbar-brand'>Hiếu Toki</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>Home</NavLink>
                        <NavLink to="/users" className='nav-link'>Users</NavLink>
                        <NavLink to="/admin" className='nav-link'>Admin</NavLink>
                    </Nav>
                    <Nav>
                        {isAuthenticated === false ?
                            <>
                                <button className='btn-login' onClick={() => handleLogin()}>
                                    Log in
                                </button>
                                <div className='btn-signup' onClick={() => handleSignup()}>
                                    Sign up
                                </div>
                            </>
                            :
                            <NavDropdown title="Settings" id='basic-nav-dropdow'>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLogOut()}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        }
                        <Languge />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;