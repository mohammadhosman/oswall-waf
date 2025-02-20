import React from "react";
import ReactDOM from 'react-dom/client';
import "../../styling/common/NavigationBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "react-bootstrap/NavBar";

function NavigationBar() {
    return (
        <NavBar bg="dark" data-bs-theme="dark" id="nav-bar">
            <NavBar.Brand href="#home" id="nav-bar-brand">
                <img alt="oswall logo" 
                src={require("../../images/common/oswall-logo-no-background.png")} 
                width="50" 
                height="50" 
                className="d-inline-block align-top"
                />
            </NavBar.Brand>
        </NavBar>
    )
}

export default NavigationBar;