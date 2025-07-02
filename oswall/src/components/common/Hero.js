import React from "react";      
import "../../styling/common/Hero.css";
import { Link } from "react-router-dom"; 

function Hero( {title, subtitle, showButton, description, buttonText, buttonLink, backgroundImage, backgroundVideo} ) {
    return (
        <header id="hero" style={{ position: 'relative', width: '100vw', height: '60vh', overflow: 'hidden' }}>
            {backgroundVideo && (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 0,
                        filter: 'brightness(0.7)'
                    }}
                    src={backgroundVideo}
                />
            )}
            <div id="hero-image" 
            className="text-center p-5 bg-image"
            style={{
                backgroundImage: backgroundVideo ? undefined : `url(${backgroundImage})`,
                height: "60vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: 'relative',
                zIndex: 1
            }}>
                <div className="hero-text d-flex justify-content-center align-items-center h-100 flex-column p-5">
                    <div className="text-white">
                        <h1 className="mb-3">{title}</h1>
                        {subtitle && <h4 className="mb-3">{subtitle}</h4>}
                        {description && <h6 className="mb-3">{description}</h6>}
                        {showButton && buttonLink && (
                            <Link to={buttonLink}>
                                <button id="register-button" className="btn btn-primary btn-lg">
                                    {buttonText}
                                </button>
                            </Link>
                        )}
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Hero;