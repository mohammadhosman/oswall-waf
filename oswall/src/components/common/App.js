import React from "react";
import ReactDOM from 'react-dom/client';
import NavigationBar from "./NavigationBar";
import "../../styling/common/App.css";

function App() {
  return (
    <div id="app">
      <NavigationBar />
      <h1>Oswall App</h1>
    </div>
  );
}

export default App;
