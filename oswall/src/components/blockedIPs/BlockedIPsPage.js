import React, { useState, useEffect } from 'react';
import NavigationBar from '../common/NavigationBar';
import Footer from '../common/Footer';
import AddBlockedIPForm from './AddBlockedIPForm';
import '../../styling/common/App.css';
import BlockedIPsTable from './BlockedIPsTable';
import BlockedIPsPagination from './BlockedIPsPagination';
import axios from 'axios';

function BlockedIPsPage() {

    const [ips, setIps] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const limit = 10; // Number of IPs per page

    const fetchIPs = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };
            const response = await axios.get(`http://localhost:5000/api/blocked-ips?page=${page}&limit=10`, config);
            setIps(response.data.ips);
            setTotal(response.data.total);
        } catch (error) {
            console.error('Error getting blocked IPs: ', error);
            setError('Failed to get blocked IPs');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchIPs();
    }, [page]);

    const handleAddIp = async (ip) => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}`}
            };
            await axios.post('http://localhost:5000/api/blocked-ips', { ip }, config);
            fetchIPs(); // Refresh the list after adding
        } catch (error) {
            console.error('Error adding blocked IP: ', error);
            setError('Failed to add blocked IP');
        }
        setLoading(false);
    };

    // Dummy delete function for now
    const handleDelete = async (id) => {
        setLoading(true);
        setError('');
        try{
            const token = localStorage.getItem('token');
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            }
            await axios.delete(`http://localhost:5000/api/blocked-ips/${id}`, config);
            fetchIPs();
        } catch (error) {
            console.error('error deleting blocked IP. sent from BlockedIPsPage.js component: ', error);
            setError('failed to delete blocked IP');
        }
        setLoading(false);
    }

    return (
        <div id='app'>
            <NavigationBar />
            <div className='mt-4'>
                <h3>Blocked IP Addresses</h3>
                <AddBlockedIPForm onAdd={handleAddIp} loading={loading} />
                <BlockedIPsTable 
                    ips={ips}
                    page={page}
                    limit={10}
                    onDelete={handleDelete}
                    loading={loading}
                />
                <BlockedIPsPagination 
                    page={page}
                    total={total}
                    limit={limit}
                    onPageChange={setPage}
                />
            </div>
            <Footer />
        </div>
    )
}

export default BlockedIPsPage;
// This component renders the blocked IPs page, which includes a form to add blocked IP addresses.