import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../../styling/common/App.css';

function UserProfile() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            const data = {
                headers: {Authorization: `Bearer ${token}`}
            }
            try {
                const response = await axios.get('http://localhost:5000/api/auth/profile', data);
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile: ', error);
                setError('Failed to fetch profile. Please try again later.');
            }
        };
        fetchProfile();
    }, []);

    if (error) {
        return <div className='user-profile mt-3' style={{color: 'red'}}>{error}</div>
    }

    if (!profile) {
        return <div className='user-profile mt-3'>Loading profile...</div>;
    }

    return (
        <div className='user-profile mt-3'>
            <h2>User profile</h2>
            <p><strong>Name: </strong>{profile.name}</p>
            <p><strong>Email: </strong>{profile.email}</p>
            <p><strong>Address: </strong>{profile.address}</p>
            <p><strong>City: </strong>{profile.city}</p>
            <p><strong>Country: </strong>{profile.country}</p>
        </div>
    );
}

export default UserProfile;