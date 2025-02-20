import React from "react";
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styling/common/NavigationBar.css";
import NavBar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";

function NavigationBar() {
    return (
        <NavBar expand="lg" bg="dark" data-bs-theme="dark" id="nav-bar">
            <NavBar.Brand href="#home" id="nav-bar-brand">
                <img alt="oswall logo" 
                src={require("../../images/common/oswall-logo-large-no-bg.png")} 
                width="50px" 
                height="50px" 
                className="d-inline-block align-top"
            
                />
            </NavBar.Brand>
            <Nav id="nav-bar-links">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
                <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
        </NavBar>
    )
}

export default NavigationBar;