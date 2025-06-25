import React from 'react';
import {Table, Button} from 'react-bootstrap';

function SecurityRulesTable({rules = [], onEdit, onDelete}) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Limit</th>
                    <th>Time Window</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {rules.length === 0 ? (
                    <tr>
                        <td colSpan={3} className='text-center'><strong>No rules set!</strong></td>
                    </tr>
                ): (
                    rules.map(rule => (
                        <tr key={rule.id}>
                            <td>{rule.limit} requests</td>
                            <td>per {rule.window} {rule.windowUnit}{rule.window >1 ? 's' : ''}</td>
                            <td>
                                <Button variant='outline-primary' size='sm' className='me-2' onClick={() => onEdit(rule)}>
                                    Edit
                                </Button>
                                <Button variant='outline-danger' size='sm' onClick={() => onDelete(rule.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </Table>
    )
}

export default SecurityRulesTable;
// This component renders a table for displaying security rules with options to edit or delete each rule.
// Used this link as a reference: https://react-bootstrap.netlify.app/docs/components/table/