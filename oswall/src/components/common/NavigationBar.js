import React, {useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styling/common/NavigationBar.css";
import Navbar from "react-bootstrap/Navbar";
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
        <Navbar expand="lg" bg="dark" data-bs-theme="dark" id="nav-bar">
            <Navbar.Brand as={Link} to="/" id="nav-bar-brand">
                <img alt="oswall logo" 
                src={require("../../images/common/oswall-logo-large-no-bg.png")} 
                width="50px" 
                height="50px" 
                className="d-inline-block align-top"
                />
            </Navbar.Brand>
            <Nav id="nav-bar-links" className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>
            <Nav id="nav-bar-login-and-signup">
                {!isLoggedIn ? (
                    <>
                    <Button
        as={Link}
        to="/login"
        variant="info"
        className="me-2"
        id="nav-bar-login-button"
      >
        Login
      </Button>
      <Button
        as={Link}
        to="/register"
        variant="primary"
        id="nav-bar-signup-button"
      >
        Sign Up
      </Button>
                    </>
                ) : (
                    <>
                    <Button
        as={Link}
        to="/dashboard"
        variant="info"
        className="me-2"
        id="nav-bar-dashboard-button"
      >
        Dashboard
      </Button>
      <Button
        variant="danger"
        id="nav-bar-logout-button"
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = "/login";
        }}
      >
        Logout
      </Button>
                    </>
                )}
            </Nav>
        </Navbar>
    )
}

export default NavigationBar;