import React from "react";
import ReactDOM from 'react-dom/client';
import NavigationBar from "./NavigationBar";
import Hero from "../index/Hero.js";
import "../../styling/common/App.css";

function App() {
  return (
    <div id="app">
      <NavigationBar />
      <h1>Oswall App</h1>
      <Hero />
    </div>
  );
}

export default App;
