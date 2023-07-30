import React from 'react';
import {INote} from "../../models/Interfaces";
import "./NoteItem.scss"
import {ReactComponent as IconHealth} from "../../assets/img/icon-health.svg";
import {ReactComponent as IconShopping} from "../../assets/img/icon-shopping.svg";
import {ReactComponent as IconTasks} from "../../assets/img/icon-tasks.svg";
import {ReactComponent as IconRemove} from "../../assets/img/icon-remove.svg";
import {ReactComponent as IconEdit} from "../../assets/img/icon-edit.svg";
import {useActions} from "../../hooks/actions";

interface NoteItemProps {
    note: INote,
    setIsOpenDialog: (isOpenDialog: boolean) => void,
    setCurrentNote: (note: INote) => void,
}

const NoteItem: React.FC<NoteItemProps> = ({note, setIsOpenDialog, setCurrentNote}) => {
    const {removeNote} = useActions()

    const handleOpenDialogForEdit = (note: INote) => {
        setCurrentNote(note)
        setIsOpenDialog(true)
    }

    const handleRemoveNote = (id: number) => {
        removeNote(id)
    }

    return (
        <>
            <td className="note__name">
                <div className="note__category-icon">
                    {note.category === "Shopping"
                        ? <IconShopping/>
                        : note.category === "Tasks" ? <IconTasks/> : <IconHealth/>
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
            <td className="note__actions">
                <div className="note__actions-edit" onClick={() => handleOpenDialogForEdit(note)} title="Edit note">
                    <IconEdit/>
                </div>
                <div className="note__actions-remove" onClick={() => handleRemoveNote(note.id)} title="Remove note">
                    <IconRemove/>
                </div>
            </td>
        </>
    );
};

export default NoteItem;