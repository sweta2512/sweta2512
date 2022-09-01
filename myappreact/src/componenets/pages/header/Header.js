import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {getLogout} from '../../../Redux/actioncreator/action'

const Header = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let isLoggedin = useSelector((state) => { return state.AuthReducer.isAuthenticated });
    let role =  useSelector((state) => { return state.AuthReducer.role }).replace(/^"(.*)"$/, '$1');
    //console.log(role)
    // role ="admin";
    // console.log(role)
     //console.log(role==="admin");
    if (!isLoggedin) {
        navigate('/');
    }
    const handleLogout = ()=>{
        localStorage.removeItem("user");
        dispatch(getLogout())
        
    }
    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand to="/home"><Link to="/home" className="nav-link">Home</Link></Navbar.Brand>
                    <Nav className="me-auto">
                        {role==="admin" && <Nav.Link  as={Link} to="/home/product" className="nav-link">Products</Nav.Link>}
                        <Nav.Link  as={Link}to="/home/testdata" className="nav-link">Test Data</Nav.Link>
                        <Nav.Link  as={Link}to="/home/user" className="nav-link">Users</Nav.Link>
                        <Nav.Link  as={Link} to="/home/pricing" className="nav-link">Pricing</Nav.Link>
                        {/* <Nav.Link  as={Link} to="/home/product" className="nav-link">anywords</Nav.Link> */}
                    </Nav>
                </Container>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        {/* <Header/> */}
                        <button type="button" className="btn btn-danger"
                            onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                </nav>

            </Navbar>
            <Outlet />


        </>
    );
}


export default Header;