// This App.js file will handle routing for the entire application
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/common/App"; //Home page component
import About from "./components/about/App"; //About page component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                {/* This is where I will add more routes */}
            </Routes>
        </Router>
    )
}

export default App;