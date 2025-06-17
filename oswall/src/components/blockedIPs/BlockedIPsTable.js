import React from 'react';
import { Table, Button } from 'react-bootstrap';

function BlockedIPsTable({ ips, page, limit, onDelete, loading }) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>IP Address</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {ips.length === 0 && !loading && (
                    <tr>
                        <td colSpan={3} className="text-center">No blocked IPs.</td>
                    </tr>
                )}
                {ips.map((ipObj, idx) => (
                    <tr key={ipObj._id}>
                        <td>{(page - 1) * limit + idx + 1}</td>
                        <td>{ipObj.ip}</td>
                        <td>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => onDelete(ipObj._id)}
                                disabled={loading}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default BlockedIPsTable;