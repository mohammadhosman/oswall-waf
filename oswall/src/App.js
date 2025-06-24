// This App.js file will handle routing for the entire application
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/index/Index"; //Home page component
import About from "./components/about/About"; //About page component
import Contact from "./components/contact/Contact"; //Contact page component
import Login from "./components/login/Login"; //Login page component
import Register from "./components/register/Register"; //Register page component
import Logout from "./components/logout/Logout"; //Logout page component
import Dashboard from "./components/dashboard/Dashboard"; //Dashboard page component
import BlockedIPsPage from "./components/blockedIPs/BlockedIPsPage"; //Blocked IPs page component
import SecurityRulesPage from "./components/securityRules/SecurityRulesPage"; //Security Rules page component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/blocked-ips" element={<BlockedIPsPage />} />
                <Route path="/security-rules" element={<SecurityRulesPage />}/>
                {/* This is where I will add more routes */}
            </Routes>
        </Router>
    )
}

export default App;