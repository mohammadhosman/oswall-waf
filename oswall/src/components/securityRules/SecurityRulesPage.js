import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Alert, Spinner } from 'react-bootstrap';
import NavigationBar from '../common/NavigationBar';
import Footer from '../common/Footer';
import SecurityRulesTable from './SecurityRulesTable';
import SecRulesForm from './SecRulesForm';
import "../../styling/common/App.css";

function SecurityRulesPage() {
    // State for rules and modal
    const [rules, setRules] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [selectedRule, setSelectedRule] = useState(null);
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
        const fetchRules = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const backendUrl = process.env.REACT_APP_BACKEND_URL;
                const res = await axios.get(`${backendUrl}/api/security-rules`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Map _id to id for all rules
                const mappedRules = res.data.map(rule => ({ ...rule, id: rule.id || rule._id }));
                setRules(mappedRules);
            } catch (err) {
                console.error('Failed to fetch rules', err);
            } finally {
                setLoading(false);
            }
        };
        fetchRules();
    }, []);

    const usedUnits = rules.map(rule => rule.windowUnit);

    const handleAddClick = () => {
        setModalMode('add');
        setSelectedRule(null);
        setShowModal(true);
    };

    const handleEditClick = (rule) => {
        setModalMode('edit');
        setSelectedRule(rule);
        setShowModal(true);
    };

    
    const handleDeleteClick = async (ruleId) => {
        try {
            const token = localStorage.getItem('token');
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            await axios.delete(`${backendUrl}/api/security-rules/${ruleId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRules(rules.filter(r => r.id !== ruleId));
            setSuccess('Rule deleted successfully!');
            setTimeout(() => setSuccess(''), 2000);
        } catch (err) {
            console.error('Failed to delete rule', err);
        }
    };

    // Function to handle saving the rule from the modal
    const handleModalSave = async (rule) => {
        const token = localStorage.getItem('token');
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        if (modalMode === 'add') {
            try {
                const res = await axios.post(`${backendUrl}/api/security-rules`, rule, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const newRule = { ...res.data, id: res.data.id || res.data._id };
                setRules([...rules, newRule]);
                setSuccess('Rule added successfully!');
                setTimeout(() => setSuccess(''), 2000);
            } catch (err) {
                console.error('Failed to add rule', err);
                throw err; // Propagate error to SecRulesForm for user feedback
            }
        } else {
            try {
                const res = await axios.put(`${backendUrl}/api/security-rules/${rule.id}`, rule, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const updatedRule = { ...res.data, id: res.data.id || res.data._id };
                setRules(rules.map(r => r.id === rule.id ? updatedRule : r));
                setSuccess('Rule updated successfully!');
                setTimeout(() => setSuccess(''), 2000);
            } catch (err) {
                console.error('Failed to update rule', err);
                throw err; // Propagate error to SecRulesForm for user feedback
            }
        }
        setShowModal(false);
    };

    return (
        <div id="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavigationBar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="container py-4" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2 className="mb-0">Security Rules Page</h2>
                        <button className="btn btn-secondary" onClick={handleAddClick}>
                            Add Rule
                        </button>
                    </div>
                    {success && <Alert variant="success" className="mb-3 text-center">{success}</Alert>}
                    <div className="bg-white rounded shadow-sm p-4 mb-4">
                        {loading ? (
                            <div className="text-center my-5">
                                <Spinner animation="border" role="status" />
                                <div className="mt-2">Loading rules...</div>
                            </div>
                        ) : (
                            <SecurityRulesTable
                                rules={rules}
                                onEdit={handleEditClick}
                                onDelete={handleDeleteClick}
                            />
                        )}
                    </div>
                </div>
            </div>
            <SecRulesForm
                show={showModal}
                mode={modalMode}
                rule={selectedRule}
                onHide={() => setShowModal(false)}
                onSave={handleModalSave}
                usedUnits={usedUnits}
            />
            <Footer />
        </div>
    );
}

export default SecurityRulesPage;