import React from 'react';
import NavigationBar from '../common/NavigationBar';
import Footer from '../common/Footer';
import UserProfile from './UserProfile';
import '../../styling/common/App.css';
import ProtectedSite from './ProtectedSite';
import BlockedIPsButton from './BlockedIPsButton';
import { Card, Container } from 'react-bootstrap';
import SecurityRulesCard from './SecurityRulesCard';
import IPManagementCard from './IPManagementCard';

function Dashboard() {
    return (
        <div id='app'>
            <NavigationBar />
            <Container className="py-4">
                <h2 className="mb-4 text-center">Welcome to your dashboard</h2>
                <UserProfile />
                <ProtectedSite />
                <IPManagementCard />
                <SecurityRulesCard />
            </Container>
            <Footer />
        </div>
    );
}

export default Dashboard;