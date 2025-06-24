import React, {useState, useEffect} from 'react';
import NavigationBar from '../common/NavigationBar';
import Footer from '../common/Footer';
import SecurityRulesTable from './SecurityRulesTable';
import "../../styling/common/App.css";

function SecurityRulesPage() {
    return (
        <div id='app'>
            <NavigationBar />
            <div className="container py-4">
                <h2>Security Rules Page</h2>
                <SecurityRulesTable />
            </div>
            <Footer />
        </div>
    );
}

export default SecurityRulesPage;