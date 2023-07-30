import React from 'react';
import {INote} from "../../models/Interfaces";
import NoteItem from "../NoteItem/NoteItem";
import "./NotesList.scss"

interface NotesListProps {
    notes: INote[],
}

const NotesList: React.FC<NotesListProps> = ({notes}) => {
    return (
        <tbody>
            {notes.map((note) =>
                <tr className="notes__row" key={note.id}>
                    <NoteItem note={note}/>
                </tr>
            )}
        </tbody>
    );
};

export default NotesList;