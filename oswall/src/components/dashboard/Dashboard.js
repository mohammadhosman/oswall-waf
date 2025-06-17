import React from 'react';
import NavigationBar from '../common/NavigationBar';
import Footer from '../common/Footer';
import UserProfile from './UserProfile';
import '../../styling/common/App.css';
import ProtectedSite from './ProtectedSite';
import BlockedIPsButton from './BlockedIPsButton';

function Dashboard() {
    return (
        <div id='app'>
        <NavigationBar />
            <h2>Welcome to your dashboard</h2>
            <UserProfile />
            <ProtectedSite />
            <BlockedIPsButton />
        <Footer />
        </div>
    );
}

export default Dashboard;