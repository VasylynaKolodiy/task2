import React from 'react';
import {ReactComponent as IconRemove} from "../../assets/img/icon-remove.svg";
import {useActions} from "../../hooks/actions";

const NotesHeaders = () => {
    const {removeAllNotes} = useActions()

    const handleRemoveAllNotes = () => {
        removeAllNotes()
    }

    return (
        <thead>
            <tr className="notes__row">
                <th>Name</th>
                <th>Created</th>
                <th>Category</th>
                <th>Content</th>
                <th>Dates</th>
                <th>
                    <div className="note__actions-remove" onClick={() => handleRemoveAllNotes()} title="Remove all notes">
                        <IconRemove/>
                    </div>
                </th>
            </tr>
        </thead>
    );
};

export default NotesHeaders;