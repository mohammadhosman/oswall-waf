import React from "react";
import ReactDOM from 'react-dom/client';
import NavigationBar from "./NavigationBar";
import Hero from "../common/Hero.js";
import Footer from "./Footer.js";
import "../../styling/common/App.css";
import heroImage from "../../images/index/hero.jpg";

function App() {
  return (
    <div id="app">
      <NavigationBar />
      <Hero 
      title="OsWall Web Application Firewall"
      subtitle="Made to protect your web app"
      showButton={true}
      buttonText="Register"
      backgroundImage={heroImage}
      />
      <Footer />
    </div>
  );
}

export default App;
