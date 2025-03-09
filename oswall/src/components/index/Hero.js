import React from "react";      
import "../../styling/index/Hero.css";

function Hero() {
    return (
        <header id="hero">
            <div id="hero-image">
                <div className="hero-text">
                    <h1>OsWall Web Application Firewall</h1>
                    <p>Made to protect your web app</p>
                    <button>Register</button>
                </div>

            </div>
        </header>
    )
}

export default Hero;