import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styling/common/App.css';

function AddProtectedSiteForm({ onSiteAdded }){
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
        }
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            await axios.post('http://localhost:5000/api/sites', data, config);
            setSuccess('Protected site added successfully');
            setUrl('');
            setSiteName('');
            if (onSiteAdded){
                onSiteAdded();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            } else if (error.message) {
                setError(error.message);
            } else {
                setError('Failed to add protected site. Please try again');
            }
        }
    };

    return (
        <form className='add-protected-site-form' onSubmit={handleSubmit}>
            <div>
                <label>Site Name:</label>
                <input 
                    type='text'
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Site URL:</label>
                <input 
                    type='url'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
            </div>
            <button type='submit'>Add Site</button>
            {error && <div style={{color: 'red'}}>{error}</div>}
            {success && <div style={{color: 'green'}}>{success}</div>}
        </form>
    );
}

export default AddProtectedSiteForm;

// This is going to be a part of the ProtectedSite.js component
