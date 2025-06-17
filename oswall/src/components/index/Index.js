import React from "react";
import ReactDOM from 'react-dom/client';
import NavigationBar from "../common/NavigationBar.js";
import Hero from "../common/Hero.js";
import Footer from "../common/Footer.js";
import "../../styling/common/App.css";
import heroImage from "../../images/index/hero.jpg";

function Index() {
  const isLoggedIn = !!localStorage.getItem('token'); // or use your auth context

  return (
    <div id="app">
      <NavigationBar />
      <Hero 
        title="OsWall Web Application Firewall"
        subtitle="Made to protect your web app"
        showButton={true}
        buttonText={isLoggedIn ? "Dashboard" : "Register"}
        buttonLink={isLoggedIn ? "/dashboard" : "/register"} // If your Hero supports buttonLink
        backgroundImage={heroImage}
      />
      <Footer />
    </div>
  );
}

export default Index;
