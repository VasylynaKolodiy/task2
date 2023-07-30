import React, {useState} from 'react';
import './App.scss';
import {useAppSelector} from "./hooks/redux";
import NotesList from "./components/NotesList/NotesList";
import NotesHeaders from "./components/NotesHeaders/NotesHeaders";
import DialogCreateNote from "./components/DialogCreateNote/DialogCreateNote";

function App() {
    const notes = useAppSelector((state) => state.notes)
    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)

    const handleOpenDialog = () => {
        setIsOpenDialog(true);
    }

    return (
        <div className="App">
            <div className={`notes ${isOpenDialog ? 'blur' : ''}`}>
                <table className="notes__table">
                    <NotesHeaders/>
                    <NotesList notes={notes}/>
                </table>

                <div className="notes__create">
                    <button onClick={() => handleOpenDialog()}>Create Note</button>
                </div>
            </div>

            <DialogCreateNote
                isOpenDialog={isOpenDialog}
                setIsOpenDialog={setIsOpenDialog}
            />
        </div>
    );
}

export default App;
