import React, {useEffect, useState} from 'react';
import {ReactComponent as IconClose} from "../../assets/img/icon-close.svg";
import "./DialogCreateEditNote.scss";
import {useActions} from "../../hooks/actions";
import {ICategory, INote} from "../../models/Interfaces";
import {parseDateFromString} from "../../helpers";

interface IDialogCreateEditNoteProps {
    isOpenDialog: boolean,
    setIsOpenDialog: (isOpenDialog: boolean) => void,
    currentNote?: INote | null,
    categories:ICategory[],
}

const DialogCreateEditNote: React.FC<IDialogCreateEditNoteProps> = ({isOpenDialog, setIsOpenDialog, currentNote, categories}) => {
    const initNote = {
        id: Date.now(),
        name: "",
        created: "",
        category: "",
        content: "",
        dates: "",
        archived: false,
    }

    const [newNote, setNewNote] = useState<INote>(initNote)
    const {createNote, editNote} = useActions();

    useEffect(() => {
        currentNote && setNewNote(currentNote)
    }, [currentNote])

    const handleCloseDialog = () => {
        setNewNote(initNote)
        setIsOpenDialog(false);
    }

    const handleCreateOrEditNote = () => {
        try {
            if (newNote.name && newNote.category && newNote.content) {
                currentNote
                    ? (
                        editNote({
                            ...newNote,
                            dates: parseDateFromString(newNote.content)
                        })
                    )
                    : (
                        createNote({
                            ...newNote,
                            created: new Date().toLocaleDateString('en-us', { day:"numeric", month:"short", year:"numeric"}),
                            dates: parseDateFromString(newNote.content)
                        })
                    )
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
                    <h3 className='dialog__title-text'>{currentNote ? 'Edit note' : 'Create new note'}</h3>
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

                        <div className="dialog__form-category">
                            <label htmlFor="category">Select category: </label>
                            <select
                                name="category"
                                id="category"
                                value={newNote.category}
                                onChange={(event) => setNewNote({...newNote, category: event.target.value})}
                            >
                                <option value="" disabled/>
                                {categories.map(category =>
                                    <option value={category.id} key={category.id}>{category.id}</option>
                                )}

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
                    <button className="dialog__create-btn" onClick={() => handleCreateOrEditNote()}>
                        {currentNote ? 'Edit' : 'Create'}
                    </button>
                    <button className="dialog__cancel-btn" onClick={() => handleCloseDialog()}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DialogCreateEditNote;