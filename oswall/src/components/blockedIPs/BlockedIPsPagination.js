import React from 'react';
import { Pagination } from 'react-bootstrap';

function BlockedIPsPagination({ page, total = 0, limit = 10, onPageChange }) {
    const totalPages = Math.ceil(total / limit);

    if (totalPages <= 1) {
        //console.log("Total pages: ", totalPages);
        return null; // No pagination neede if there's only one page
    }

    return (
        <Pagination className='mt-3'>
            <Pagination.Prev 
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
            />

            {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                    key={index + 1}
                    active={index + 1 === page}
                    onClick={() => onPageChange(index + 1)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next 
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
            />

        </Pagination>
    );
}

export default BlockedIPsPagination;
// This component renders pagination for the blocked IPs table.