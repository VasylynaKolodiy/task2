import React, {useState} from 'react';
import './App.scss';
import {useAppSelector} from "./hooks/redux";
import NotesList from "./components/NotesList/NotesList";
import NotesHeaders from "./components/NotesHeaders/NotesHeaders";
import {INote} from "./models/Interfaces";
import DialogCreateEditNote from "./components/DialogCreateEditNote/DialogCreateEditNote";

function App() {
    const notes = useAppSelector((state) => state.notes)
    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
    const [currentNote, setCurrentNote] = useState<INote | null>(null)
    const [showArchived, setShowArchived] = useState(false);
    const notArchivedNotes = notes?.filter(note => !note.archived)
    const isAllNotesArchived = ((notArchivedNotes.length === 0) && (notes.length > 0))

    const handleOpenDialogForCreate = () => {
        setCurrentNote(null)
        setIsOpenDialog(true);
    }

    return (
        <div className="App">
            {notes.length > 0
                ? (
                    <div className={`notes ${isOpenDialog ? 'blur' : ''}`}>
                        <div className="notes__archived">
                            <div
                                className={`notes__notification ${(isAllNotesArchived && !showArchived) ? 'visible' : ''}`}
                            >
                                You have only archived notes.
                                Please check "Show archived notes" or create a new note.
                            </div>

                            <div>
                                <label htmlFor="archive">Show archived notes: </label>
                                <input
                                    type="checkbox"
                                    id="archive"
                                    checked={showArchived}
                                    onChange={(event) => setShowArchived(event.target.checked)}
                                />
                            </div>
                        </div>

                        <table className="notes__table">
                            <NotesHeaders
                                isAllNotesArchived={isAllNotesArchived}
                            />
                            <NotesList
                                notes={showArchived ? notes : notArchivedNotes}
                                setIsOpenDialog={setIsOpenDialog}
                                setCurrentNote={setCurrentNote}
                            />
                        </table>
                    </div>
                )
                : (
                    <h4>Your note's list is empty. You can create new note.</h4>
                )
            }

            <div className="notes__create">
                <button onClick={() => handleOpenDialogForCreate()}>Create Note</button>
            </div>

            <DialogCreateEditNote
                isOpenDialog={isOpenDialog}
                setIsOpenDialog={setIsOpenDialog}
                currentNote={currentNote}
            />
        </div>
    );
}

export default App;
