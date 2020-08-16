import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useAuth } from "../context/auth";
const createHistory = require("history").createBrowserHistory;

function Bar(props) {
    const { authTokens, setAuthTokens } = useAuth();
    
    function logOut() {
        setAuthTokens();
        localStorage.clear();
        let history = createHistory();
        history.push("/login");
    }
    return(
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="/">AcklenAvenue</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                </Nav>
                <Nav>
                    {authTokens
                        ? <Nav.Link onClick={logOut}>Logout</Nav.Link>
                        : <Nav.Link href="/login">Login</Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Bar;
