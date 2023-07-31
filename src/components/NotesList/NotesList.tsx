import React from 'react';
import {INote} from "../../models/Interfaces";
import NoteItem from "../NoteItem/NoteItem";
import "./NotesList.scss"

interface NotesListProps {
    notes: INote[],
    setIsOpenDialog: (isOpenDialog: boolean) => void,
    setCurrentNote: (note: INote) => void,
}

const NotesList: React.FC<NotesListProps> = ({notes, setIsOpenDialog, setCurrentNote}) => {
    return (
        <tbody>
            {notes.map((note) =>
                <tr className={`notes__row ${note.archived ? 'archived' : ''}`} key={note.id}>
                    <NoteItem
                        note={note}
                        setIsOpenDialog={setIsOpenDialog}
                        setCurrentNote={setCurrentNote}
                    />
                </tr>
            )}
        </tbody>
    );
};

export default NotesList;