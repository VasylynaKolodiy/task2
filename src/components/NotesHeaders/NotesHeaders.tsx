import React from 'react';
import {ReactComponent as IconRemove} from "../../assets/img/icon-remove.svg";
import {ReactComponent as IconArchive} from "../../assets/img/icon-archive.svg";
import {ReactComponent as IconUnArchive} from "../../assets/img/icon-unarchive.svg";
import {useActions} from "../../hooks/actions";

interface NotesHeadersProps {
    isAllNotesArchived: boolean,
}

const NotesHeaders: React.FC<NotesHeadersProps> = ({isAllNotesArchived}) => {
    const {removeAllNotes, archiveAllNotes} = useActions()

    return (
        <thead>
        <tr className="notes__row">
            <th>Name</th>
            <th>Created</th>
            <th>Category</th>
            <th>Content</th>
            <th>Dates</th>
            <th className="note__actions">
                <div
                    className="note__actions-archive"
                    onClick={() => archiveAllNotes(!isAllNotesArchived)}
                    title={`${isAllNotesArchived ? "UnArchive all notes" : "Archive all notes"}`}
                >
                    {isAllNotesArchived ? <IconUnArchive/> : <IconArchive/>}
                </div>

                <div
                    className="note__actions-remove"
                    onClick={() => removeAllNotes()}
                    title="Remove all notes"
                >
                    <IconRemove/>
                </div>
            </th>
        </tr>
        </thead>
    );
};

export default NotesHeaders;