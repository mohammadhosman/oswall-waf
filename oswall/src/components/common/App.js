import React from "react";
import ReactDOM from 'react-dom/client';
import NavigationBar from "./NavigationBar";
import Hero from "../index/Hero.js";
import Footer from "./Footer.js";
import "../../styling/common/App.css";

function App() {
  return (
    <div id="app">
      <NavigationBar />
      <Hero />
      <Footer />
    </div>
  );
}

export default App;
