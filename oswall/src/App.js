// This App.js file will handle routing for the entire application
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/index/Index"; //Home page component
import About from "./components/about/About"; //About page component
import Contact from "./components/contact/Contact"; //Contact page component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                {/* This is where I will add more routes */}
            </Routes>
        </Router>
    )
}

export default App;