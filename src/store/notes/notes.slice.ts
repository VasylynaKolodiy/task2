import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {INote} from "../../models/Interfaces";

const notes = [
    {
        id: 0,
        name: "To create a notes app in JS",
        created: "Jul 23, 2023",
        category: "Tasks",
        content: "Task is to create a notes app in JS as a web app. Users can add, edit and remove notes",
        dates: "-",
    },
    {
        id: 1,
        name: "To buy backpack",
        created: "Jul 23, 2023",
        category: "Shopping",
        content: "Buy a comfortable backpack for travel until 01/08/2023",
        dates: "01/08/2023",
    },
    {
        id: 2,
        name: "To create a notes app in React.js",
        created: "Jul 23, 2023",
        category: "Tasks",
        content: "Task is to create a notes app using React.js, Redux Toolkit and TypeScript",
        dates: "-",
    },
    {
        id: 3,
        name: "To create a NodeJS application",
        created: "Jul 23, 2023",
        category: "Tasks",
        content: "Task is to create a notes app using NodeJS. That will have few REST endpoints until 7/08/2023",
        dates: "7/08/2023",
    },
    {
        id: 4,
        name: "To buy a sunscreen",
        created: "Jul 23, 2023",
        category: "Shopping",
        content: "Buy a sunscreen until dates between 06/08/2023 and 13/08/2023",
        dates: "06/08/2023, 13/08/2023",
    },
    {
        id: 5,
        name: "To make an appointment with a dentist",
        created: "Jul 23, 2023",
        category: "Health and beauty",
        content: "I’m gonna have a dentist appointment on the 3/5/2023, I moved it from 5/5/2023",
        dates: "3/5/2023, 5/5/2023",
    },
    {
        id: 6,
        name: "To make an appointment with a hairdresser",
        created: "Jul 23, 2023",
        category: "Health and beauty",
        content: "Make an appointment with a hairdresser",
        dates: "-",
    },
]

const initialState = {
    notes: notes
}

export const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        createNote(state, action: PayloadAction<INote>) {
            state.notes.unshift(action.payload)
        },

        removeNote(state, action: PayloadAction<number>) {
            state.notes = state.notes.filter(note => note.id !== action.payload)
        },

        removeAllNotes(state) {
            state.notes.length = 0
        },

        editNote(state, action: PayloadAction<INote>) {
            const index = state.notes.findIndex(note => note.id === action.payload.id);
            state.notes[index] = action.payload
        },
    }
})

export const notesActions = notesSlice.actions;
export const notesReducer = notesSlice.reducer;