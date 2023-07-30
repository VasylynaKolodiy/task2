import React, {useState} from 'react';
import {ReactComponent as IconClose} from "../../assets/img/icon-close.svg";
import "./DialogCreateNote.scss";
import {useActions} from "../../hooks/actions";
import {INote} from "../../models/Interfaces";
import {useId} from 'react'
import {parseDateFromString} from "../../helpers";

interface IDialogCreateNoteProps {
    isOpenDialog: boolean,
    setIsOpenDialog: (isOpenDialog: boolean) => void,
}

const DialogCreateNote: React.FC<IDialogCreateNoteProps> = ({isOpenDialog, setIsOpenDialog}) => {
    const initNote = {
        id: +useId(),
        name: "",
        created: "",
        category: "",
        content: "",
        dates: "",
    }

    const [newNote, setNewNote] = useState<INote>(initNote)
    const {createNote} = useActions()

    const handleCloseDialog = () => {
        setIsOpenDialog(false);
    }

    const handleCreateNote = () => {
        try {
            if (newNote.name && newNote.category && newNote.content) {
                createNote({
                    ...newNote,
                    created: new Date().toLocaleDateString('en-us', { day:"numeric", month:"short", year:"numeric"}),
                    dates: parseDateFromString(newNote.content)
                })
                setNewNote(initNote)
                setIsOpenDialog(false)
            } else {
                alert("Fill in all fields, please")
            }
        } catch (err) {
            alert(String(err));
        }
    }

    return (
        <div className={`dialog ${isOpenDialog ? 'open' : ''}`}>
            <div className="overlay" onClick={() => handleCloseDialog()}>
            </div>

            <div className="dialog__window">
                <div className="dialog__title">
                    <div className='dialog__title-text'>Create new note</div>
                    <div className='dialog__close-btn' onClick={() => handleCloseDialog()}>
                        <IconClose/>
                    </div>
                </div>

                <div className="dialog__content">
                    <form className="dialog__form">
                        <div className="dialog__form-name">
                            <label htmlFor="name">Note's name: </label>
                            <input
                                type="text"
                                id="name"
                                value={newNote.name}
                                onChange={(event) => setNewNote({...newNote, name: event.target.value})}
                            />
                        </div>

                        <div className="dialog__form-Category">
                            <label htmlFor="category">Select category: </label>
                            <select
                                name="category"
                                id="category"
                                value={newNote.category}
                                onChange={(event) => setNewNote({...newNote, category: event.target.value})}
                            >
                                <option value="" disabled>Select category</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Tasks">Tasks</option>
                                <option value="Health and beauty">Health and beauty</option>

                            </select>
                        </div>

                        <div className="dialog__form-content">
                            <label htmlFor="content">Note's content: </label>
                            <textarea
                                id="content"
                                rows={5}
                                value={newNote.content}
                                onChange={(event) => setNewNote({...newNote, content: event.target.value})}
                            />
                        </div>
                    </form>
                </div>

                <div className="dialog__actions">
                    <button className="dialog__create-btn" onClick={() => handleCreateNote()}>
                        Create
                    </button>
                    <button className="dialog__cancel-btn" onClick={() => handleCloseDialog()}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DialogCreateNote;