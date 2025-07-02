import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup, Spinner, Alert } from 'react-bootstrap';
import '../../styling/common/App.css';

function UserProfile() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            const data = {
                headers: { Authorization: `Bearer ${token}` }
            }
            try {
                const backendUrl = process.env.REACT_APP_BACKEND_URL;
                const response = await axios.get(`${backendUrl}/api/auth/profile`, data);
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile: ', error);
                setError('Failed to fetch profile. Please try again later.');
            }
        };
        fetchProfile();
    }, []);

    if (error) {
        return <Alert variant="danger" className="mt-3">{error}</Alert>;
    }

    if (!profile) {
        return (
            <div className="d-flex justify-content-center align-items-center mt-5">
                <Spinner animation="border" variant="primary" />
                <span className="ms-2">Loading profile...</span>
            </div>
        );
    }

    return (
        <Card className="shadow-sm mt-4 mx-auto" style={{ maxWidth: 400 }}>
            <Card.Body>
                <Card.Title className="mb-3 text-center">User Profile</Card.Title>
                <ListGroup variant="flush">
                    <ListGroup.Item><strong>Name:</strong> {profile.name}</ListGroup.Item>
                    <ListGroup.Item><strong>Email:</strong> {profile.email}</ListGroup.Item>
                    <ListGroup.Item><strong>Address:</strong> {profile.address}</ListGroup.Item>
                    <ListGroup.Item><strong>City:</strong> {profile.city}</ListGroup.Item>
                    <ListGroup.Item><strong>Country:</strong> {profile.country}</ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

export default UserProfile;