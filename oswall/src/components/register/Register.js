import React from "react";
import ReactDOM from 'react-dom/client';
import NavigationBar from "../common/NavigationBar.js";
import Footer from "../common/Footer.js";
import "../../styling/common/App.css";
import RegisterForm from "./RegisterForm.js";

function Register() {
    return (
        <div id="app">
            <NavigationBar />
            <div className="container mt-5">
                <h1>Register</h1>
                <RegisterForm />
            </div>
            <Footer />
        </div>
    )
}

export default Register;