import React from 'react';

const NotesHeaders = () => {
    return (
        <thead>
            <tr className="notes__row">
                <th>Name</th>
                <th>Created</th>
                <th>Category</th>
                <th>Content</th>
                <th>Dates</th>
            </tr>
        </thead>
    );
};

export default NotesHeaders;