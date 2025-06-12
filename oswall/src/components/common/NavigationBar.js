import React, {useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styling/common/NavigationBar.css";
import NavBar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";


function NavigationBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Check if user is logged in by checking for a token in local storage

    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(!!localStorage.getItem('token'));
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        }
    }, []);

    return (
        <NavBar expand="lg" bg="dark" data-bs-theme="dark" id="nav-bar">
            <NavBar.Brand as={Link} to="/" id="nav-bar-brand">
                <img alt="oswall logo" 
                src={require("../../images/common/oswall-logo-large-no-bg.png")} 
                width="50px" 
                height="50px" 
                className="d-inline-block align-top"
                />
            </NavBar.Brand>
            <Nav id="nav-bar-links" className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>
            <Nav id="nav-bar-login-and-signup">
                {/* Have to wrap <Button> element with a <Link> tag 
                in order to send users to another page after clicking
                on that button*/}
                {!isLoggedIn && (
                    <>
                    <Link to={"/login"}>
                    <Button variant="outline-info" id="nav-bar-login-button">Login</Button>
                </Link>

                {/* This is the sign up button that will take users to the register page */}
                <Link to={"/register"}>
                    <Button variant="info" id="nav-bar-signup-button">Sign Up</Button>
                </Link>
                </>
                )}

                {isLoggedIn && (
                    <>
                    <Link to={"/dashboard"}>
                    <Button variant="info" id="nav-bar-dashboard-button">Dashboard</Button>
                </Link>

                
                <Link to={"/logout"}>
                    <Button variant="outline-info" id="nav-bar-logout-button">Logout</Button>
                </Link>
                </>
                )}
            </Nav>
        </NavBar>
    )
}

export default NavigationBar;