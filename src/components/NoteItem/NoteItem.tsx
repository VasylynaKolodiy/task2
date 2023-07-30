import React from 'react';
import {INote} from "../../models/Interfaces";
import {ReactComponent as IconHealth} from "../../assets/img/icon-health.svg";
import {ReactComponent as IconShopping} from "../../assets/img/icon-shopping.svg";
import {ReactComponent as IconTasks} from "../../assets/img/icon-tasks.svg";
import "./NoteItem.scss"

interface NoteItemProps {
    note: INote,
}

const NoteItem: React.FC<NoteItemProps> = ({note}) => {
    return (
        <>
            <td className="note__name">
                <div className="note__category-icon">
                    {note.category == "Shopping"
                        ? <IconShopping/>
                        : note.category == "Tasks" ? <IconTasks/> : <IconHealth/>
                    }
                </div>
                <div className="note__name-text">
                    {note.name}
                </div>
            </td>
            <td className="note__created">
                {note.created}
            </td>
            <td className="note__category">
                {note.category}
            </td>
            <td className="note__content">
                {note.content}
            </td>
            <td className="note__dates">
                {note.dates}
            </td>
        </>
    );
};

export default NoteItem;