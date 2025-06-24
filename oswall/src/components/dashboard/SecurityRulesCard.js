import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SecurityRulesCard() {
    return (
        <Card className="shadow-sm mt-4 mx-auto" style={{ maxWidth: 500 }}>
            <Card.Body className="text-center">
                <h5>Customize Your Security Rules</h5>
                <p className="mb-3">
                    Create and manage your own firewall rules for your site.
                </p>
                <Button variant="primary" as={Link} to="/security-rules">
                    Manage Rules
                </Button>
            </Card.Body>
        </Card>
    );
}

export default SecurityRulesCard;