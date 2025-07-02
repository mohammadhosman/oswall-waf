import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function DeleteProtectedSiteButton({ onDeleted, setError }) {
    const handleDelete = async () => {
        setError('');
        try {
            const token = localStorage.getItem('token');
            const config ={
                headers: { Authorization: `Bearer ${token}`}
            };
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            await axios.delete(`${backendUrl}/api/sites`, config);
            if (onDeleted){
                onDeleted();
            }
        } catch (error) {
            setError('Failed to delete protected site. Please try again later.');
            console.error('Error deleting protected site: ');
        }
    };
    
    return (
        <Button variant='danger' onClick={handleDelete} className='mt-2'>
            Delete Site
        </Button>
    );
}

export default DeleteProtectedSiteButton;
// This component provides a button to delete the protected site.
// It uses axios to send a DELETE request to the server.
// This is a smaller component that will be used in the ProtectedSite.js component.