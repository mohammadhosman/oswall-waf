import React from 'react';
import NavigationBar from '../common/NavigationBar';
import Footer from '../common/Footer';
import UserProfile from './UserProfile';
import '../../styling/common/App.css';
import ProtectedSite from './ProtectedSite';
import BlockedIPsButton from './BlockedIPsButton';
import { Card, Container } from 'react-bootstrap';

function Dashboard() {
    return (
        <div id='app'>
            <NavigationBar />
            <Container className="py-4">
                <h2 className="mb-4 text-center">Welcome to your dashboard</h2>
                <UserProfile />
                <ProtectedSite />
                <Card className="shadow-sm mt-4 mx-auto" style={{ maxWidth: 500 }}>
                    <Card.Body className="text-center">
                        <h5>Manage Blocked IPs</h5>
                        <p className="mb-3">View and manage IP addresses that are blocked from accessing your site.</p>
                        <BlockedIPsButton />
                    </Card.Body>
                </Card>
            </Container>
            <Footer />
        </div>
    );
}

export default Dashboard;