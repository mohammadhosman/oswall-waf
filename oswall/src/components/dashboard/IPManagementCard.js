import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlockedIPsButton from './BlockedIPsButton';


function IPManagementCard() {
    return (
        <Card className="shadow-sm mt-4 mx-auto" style={{ maxWidth: 500 }}>
                            <Card.Body className="text-center">
                                <h5>Manage Blocked IPs</h5>
                                <p className="mb-3">View and manage IP addresses that are blocked from accessing your site.</p>
                                <BlockedIPsButton />
                            </Card.Body>
                        </Card>
    );
}

export default IPManagementCard;