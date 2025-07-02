import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Stack } from 'react-bootstrap';
import '../../styling/common/App.css';

function AddProtectedSiteForm({ onSiteAdded }) {
    const [url, setUrl] = useState('');
    const [siteName, setSiteName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        const token = localStorage.getItem('token');
        const data = {
            siteName: siteName,
            siteUrl: url
        };
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            await axios.post(`${backendUrl}/api/sites`, data, config);
            setSuccess('Protected site added successfully!');
            setUrl('');
            setSiteName('');
            if (onSiteAdded) {
                onSiteAdded();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else if (error.message) {
                setError(error.message);
            } else {
                setError('Failed to add protected site. Please try again.');
            }
        }
    };

    return (
        <Form className="p-3 border rounded bg-light" onSubmit={handleSubmit}>
            <Stack gap={3}>
                <Form.Group>
                    <Form.Label>Site Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        placeholder="e.g. My Portfolio"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Site URL</Form.Label>
                    <Form.Control
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="e.g. https://mywebsite.com"
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Add Site
                </Button>
                {error && <Alert variant="danger" className="mb-0">{error}</Alert>}
                {success && <Alert variant="success" className="mb-0">{success}</Alert>}
            </Stack>
        </Form>
    );
}

export default AddProtectedSiteForm;
