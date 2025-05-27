import React from "react";
import ReactDOM from 'react-dom/client';
import NavigationBar from "../common/NavigationBar.js";
import Footer from "../common/Footer.js";
import "../../styling/common/App.css";
import LoginForm from "./LoginForm.js"; 

function Login(){
    return (
        <div id="app">
            <NavigationBar />
            <div className="container mt-5">
                <h1>Login below!</h1>
                <LoginForm />
            </div>
            <Footer />
        </div>
    )
}

export default Login;