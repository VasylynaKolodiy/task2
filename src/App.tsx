import React, {useState} from 'react';
import './App.scss';
import {useAppSelector} from "./hooks/redux";
import TableBody from "./components/TableBody/TableBody";
import TableHeader from "./components/TableHeader/TableHeader";
import {ICategory, INote, ISummary} from "./models/Interfaces";
import DialogCreateEditNote from "./components/DialogCreateEditNote/DialogCreateEditNote";
import {ReactComponent as IconUnArchive} from "./assets/img/icon-unarchive.svg";
import {ReactComponent as IconArchive} from "./assets/img/icon-archive.svg";
import {ReactComponent as IconRemove} from "./assets/img/icon-remove.svg";
import {useActions} from "./hooks/actions";
import {ReactComponent as IconEdit} from "./assets/img/icon-edit.svg";

function App() {
    const notes = useAppSelector((state) => state.notes)
    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
    const [currentNote, setCurrentNote] = useState<INote | null>(null)
    const [showArchived, setShowArchived] = useState(false);
    const notArchivedNotes = notes?.filter(note => !note.archived)
    const isAllNotesArchived = ((notArchivedNotes.length === 0) && (notes.length > 0))
    const {removeNote, removeAllNotes, archiveNote, archiveAllNotes} = useActions()

    const cellsNotes = [
        {attr: 'icon', title: ''},
        {attr: 'name', title: 'Name'},
        {attr: 'created', title: 'Created'},
        {attr: 'category', title: 'Category'},
        {attr: 'content', title: 'Content'},
        {attr: 'dates', title: 'Dates'},
        {
            attr: 'actions', title: '', node: {
                head: (
                    <div className="note__actions">
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
                    </div>
                ),
                body: (note: INote) => (
                    <div className="note__actions">
                        <div
                            className="note__actions-edit"
                            onClick={() => handleOpenDialog(note)}
                            title="Edit note"
                        >
                            <IconEdit/>
                        </div>
                        <div
                            className="note__actions-archive"
                            onClick={() => handleArchiveNote(note)}
                            title={note.archived ? "UnArchive note" : "Archive note"}
                        >
                            {note.archived ? <IconUnArchive/> : <IconArchive/>}
                        </div>
                        <div
                            className="note__actions-remove"
                            onClick={() => handleRemoveNote(note.id)}
                            title="Remove note"
                        >
                            <IconRemove/>
                        </div>
                    </div>
                )
            }
        }
    ]

    const categories:ICategory[] = [
        {id: "Shopping",},
        {id: "Tasks",},
        {id: "Health and beauty",},
    ]

    const summary = notes.reduce((acc, item) => {
        if(!acc[item.category]){
            acc[item.category] = {title: item.category, archivedCount: 0, activeCount: 0}
        }
        acc[item.category] = {...acc[item.category], archivedCount: item.archived ? acc[item.category].archivedCount + 1 : acc[item.category].archivedCount, activeCount: !item.archived ? acc[item.category].activeCount + 1 : acc[item.category].activeCount}
        return acc;
    }, {} as ISummary)

    const cellsCategories = [
        {attr: 'title', title: 'Note Category'},
        {attr: 'activeCount', title: 'Active'},
        {attr: 'archivedCount', title: 'Archived'},
    ]

    const handleOpenDialog = (note: INote | null) => {
        setCurrentNote(note)
        setIsOpenDialog(true)
    }

    const handleArchiveNote = (note: INote) => {
        archiveNote(note)
    }

    const handleRemoveNote = (id: number) => {
        removeNote(id)
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
                            <TableHeader cells={cellsNotes}/>
                            <TableBody
                                data={showArchived ? notes : notArchivedNotes}
                                cells={cellsNotes}
                            />
                        </table>
                    </div>
                )
                : (
                    <h4>Your note's list is empty. You can create new note.</h4>
                )
            }

            <div className="notes__create">
                <button onClick={() => handleOpenDialog(null)}>Create Note</button>
            </div>

            <DialogCreateEditNote
                isOpenDialog={isOpenDialog}
                setIsOpenDialog={setIsOpenDialog}
                currentNote={currentNote}
                categories={categories}
            />

            <table className="notes__table">
                <TableHeader cells={cellsCategories}/>
                <TableBody data={Object.values(summary)} cells={cellsCategories}
                />
            </table>
        </div>
    );
}

export default App;
