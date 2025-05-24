import React from "react";      
import "../../styling/common/Hero.css";

function Hero( {title, subtitle, showButton, description, buttonText, backgroundImage} ) {
    return (
        <header id="hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div id="hero-image" 
            className="text-center p-5 bg-image"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                height: "100vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}>
                <div className="hero-text d-flex justify-content-center align-items-center h-100 flex-column p-5">
                    <div className="text-white">
                        <h1 className="mb-3">{title}</h1>
                        {subtitle && <h4 className="mb-3">{subtitle}</h4>}
                        {description && <h6 className="mb-3">{description}</h6>}
                        {showButton && <button id="register-button" className="btn btn-primary btn-lg">{buttonText}</button>}
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Hero;