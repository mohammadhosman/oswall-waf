import React from "react";

function NavigationBar() {
    return (
        <div id="navigation-bar" className="top-nav">
            <a className="active" href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
        </div>
    )
}

export default NavigationBar;