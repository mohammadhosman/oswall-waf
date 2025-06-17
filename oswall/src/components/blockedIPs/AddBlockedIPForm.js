import React, { useState } from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import axios from 'axios';

function isValidIP(ip) {
    // Strict IPv4
    const ipv4 = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;
    // Strict IPv6 
    const ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::1)$/;
    return ipv4.test(ip) || ipv6.test(ip);
}

function AddBlockedIPForm({ onAdd, loading }) {
    const [ip, setIp] = useState('');
    const [localError, setLocalError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!ip){
            return;
        }
        if (!isValidIP(ip.trim())) {
            console.error('Invalid IPv4 address: ', ip);
            setLocalError('Please enter a valid IPv4 address.');
            return;
        }
        setLocalError('');
        onAdd(ip.trim());
        setIp('');
    };

    return (
        <>
        <Form onSubmit={handleSubmit} className='mb-3 d-flex'>
            <Form.Control 
                type='text'
                placeholder='Enter IP address to block'
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                required
                style={{ maxWidth: 250, marginRight: 10}}
                disabled={loading}
            />
            <Button type='submit' variant='primary' disabled={loading}>
                Add IP
            </Button>
        </Form>
        {localError && <Alert variant="danger">{localError}</Alert>}
        </>
    );
}

export default AddBlockedIPForm;
// This component provides a form to add a blocked IP address.