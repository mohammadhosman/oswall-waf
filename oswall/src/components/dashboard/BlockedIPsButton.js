import React from 'react';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

function BlockedIPsButton() {
    return (
        <Link to="/blocked-ips">
            <Button variant="primary" className='mt-3'>
                View Blocked IPs
            </Button>
        </Link>
    );
}

export default BlockedIPsButton;
// This component provides a button that links to the blocked IPs page.
