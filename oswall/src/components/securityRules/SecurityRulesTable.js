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
                    <h1>Working on this part of table</h1>
                )}
            </tbody>
        </Table>
    )
}

export default SecurityRulesTable;
// This component renders a table for displaying security rules with options to edit or delete each rule.
// Used this link as a reference: https://react-bootstrap.netlify.app/docs/components/table/