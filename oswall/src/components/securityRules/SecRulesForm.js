import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

function SecRulesForm({ show, mode, rule, onHide, onSave, usedUnits = [] }) {
    const [form, setForm] = useState({ limit: '', windowUnit: 'second' });
    const [error, setError] = useState('');

    useEffect(() => {
        if (mode === 'edit' && rule) {
            setForm({
                id: rule.id,
                limit: rule.limit,
                windowUnit: rule.windowUnit
            });
        } else {
            setForm({ limit: '', windowUnit: 'second' });
        }
        setError(''); // Clear error when modal opens or mode/rule changes
    }, [mode, rule, show]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await onSave(form);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Failed to save rule. Please try again.');
            }
        }
    };

    const timeUnits = ['second', 'minute', 'hour', 'day'];

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {mode === 'add' ? 'Add Security Rule' : 'Edit Security Rule'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Request Limit</Form.Label>
                        <Form.Control
                            type="number"
                            name="limit"
                            value={form.limit}
                            onChange={handleChange}
                            placeholder="e.g. 100"
                            min={1}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Time Unit</Form.Label>
                        <Form.Select
                            name="windowUnit"
                            value={form.windowUnit}
                            onChange={handleChange}
                        >
                            {timeUnits.map(unit => (
                                <option
                                    key={unit}
                                    value={unit}
                                    disabled={
                                        usedUnits.includes(unit) && !(mode === 'edit' && rule && rule.windowUnit === unit)
                                    }
                                >
                                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Button type="submit" variant="primary" className="w-100">
                        {mode === 'add' ? 'Add Rule' : 'Save Changes'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default SecRulesForm;
// This component provides a modal form for adding or editing security rules.
// Referenced link: https://react-bootstrap.netlify.app/docs/components/modal/
// https://react-bootstrap.netlify.app/docs/forms/overview/