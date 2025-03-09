import React from "react";      
import "../../styling/index/Hero.css";

function Hero() {
    return (
        <header id="hero">
            <div id="hero-image" className="text-center p-5 bg-image">
                <div className="hero-text d-flex justify-content-center align-items-center h-100 flex-column p-5">
                    <div className="text-white">
                        <h1 className="mb-3">OsWall Web Application Firewall</h1>
                        <h4 className="mb-3">Made to protect your web app</h4>
                        <button>Register</button>
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Hero;