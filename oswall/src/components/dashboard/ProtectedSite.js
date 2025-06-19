import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Alert, Button } from 'react-bootstrap';
import '../../styling/common/App.css';
import AddProtectedSiteForm from './AddProtectedSiteForm';
import DeleteProtectedSiteButton from './DeleteProtectedSiteButton';

function ProtectedSite() {
    const [site, setSite] = useState(null);
    const [error, setError] = useState('');
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchSite = async () => {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            try {
                const response = await axios.get('http://localhost:5000/api/sites', config)
                setSite(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setSite(null);
                } else {
                    setError('Failed to fetch protected site. Please try again later.');
                }
            }
        }
        fetchSite();
    }, [refresh]);

    const handleSiteAddedOrDeleted = () => {
        setRefresh((r) => !r);
    };

    return (
        <Card className="shadow-sm mt-4 mx-auto" style={{ maxWidth: 500 }}>
            <Card.Body>
                <Card.Title className="mb-3 text-center">Your Protected Website</Card.Title>
                {error && <Alert variant="danger">{error}</Alert>}
                {!site && !error && (
                    <div>
                        <Alert variant="info">No protected site yet.</Alert>
                        <AddProtectedSiteForm onSiteAdded={handleSiteAddedOrDeleted} />
                    </div>
                )}
                {site && (
                    <div>
                        <Card.Text>
                            <strong>URL:</strong> {site.siteUrl}
                        </Card.Text>
                        <Card.Text>
                            <strong>Name:</strong> {site.siteName}
                        </Card.Text>
                        <DeleteProtectedSiteButton
                            onDeleted={handleSiteAddedOrDeleted}
                            setError={setError}
                        />
                    </div>
                )}
            </Card.Body>
        </Card>
    );
}

export default ProtectedSite;