import React from "react";
import ReactDOM from 'react-dom/client';
import NavigationBar from "../common/NavigationBar";
import Hero from "../common/Hero";
import Footer from "../common/Footer";
import "../../styling/common/App.css";
import heroImage from "../../images/about/hero.jpg";

function App(){
    return (
        <div id="app">
            <NavigationBar />
            <Hero 
                title="About OsWall"
                description="A simple web application firewall that protects your web
                application from DDOS attacks. Simply create an account and add your
                web application to the firewall. OsWall will then protect your web
                application from DDOS attacks."
                showButton={false}
                backgroundImage={heroImage}
            />
            <Footer />
        </div>
    );
}

export default App;