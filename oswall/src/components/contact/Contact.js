import React from "react";
import ReactDOM from 'react-dom/client';
import NavigationBar from "../common/NavigationBar.js";
import Footer from "../common/Footer.js";
import "../../styling/common/App.css";
import ContactForm from "./ContactForm.js";

function Contact() {
    return(
        <div id="app">
            <NavigationBar />
            <div className="container mt-5">
                <h1>Contact Us</h1>
                <ContactForm />
            </div>
            <Footer />
        </div>    
    )
}

export default Contact;