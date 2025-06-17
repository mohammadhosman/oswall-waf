import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
                headers: { Authorization: `Bearer ${token}`}
            }
            try {
                const response = await axios.get('http://localhost:5000/api/sites', config)
                console.log('Protected site response: ', response.data);
                setSite(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404){
                    setSite(null);
                } else {
                    console.error('Error fetching protected site: ', error.response.status);
                    setError('Failed to fetch protected site. Please try again later.');
                }
                
            }
        }
        fetchSite();
    }, [refresh]);

    const handleSiteAddedOrDeleted = () => {
        setRefresh((r) => !r);
    };

    console.log('Protected site from ProtectedSite.js component: ', site);
    return (
        <div className='protected-site mt-4'>
            <h3>Your protected Website</h3>
            {error && <div style={{color: 'red'}}>{error}</div>}
            {!site && !error && (
                <div>
                    <p>No protected site yet.</p>
                    <AddProtectedSiteForm onSiteAdded={handleSiteAddedOrDeleted} />
                </div>
                )}
            
            {site && (
                <div>
                    <p><strong>URL: </strong> {site.siteUrl}</p>
                    <p><strong>Name: </strong>{site.siteName}</p>
                    <DeleteProtectedSiteButton 
                        onDeleted={handleSiteAddedOrDeleted} 
                        setError={setError}
                    />
                </div>
            )}
        </div>
    );
}

export default ProtectedSite;