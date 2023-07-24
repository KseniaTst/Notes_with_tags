import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AddFilterAC, AddNoteAC, FetchNotesAC} from "./store/notes-reducer";
import {NotesList} from "./Components/NotesList/NotesList";
import {AddTagAC} from "./store/tags-reducer";
import {useIndexedDB} from "react-indexed-db-hook";
import {FilterForm} from "./Components/FilterForm";
import {AppRootStateType} from "./store/store";


function App() {
    const db = useIndexedDB('notes');
    const {add, getAll} = useIndexedDB("notes");

    const tags = useSelector<AppRootStateType, Array<string>>(state => state.tags)

    const dispatch = useDispatch()

    const [filter, setFilter] = React.useState('all');

    useEffect(() => {
        getAll().then((res) => {
            dispatch(FetchNotesAC(res))
            console.log(res)
        })
    }, [])

    const addNote = useCallback((title: string) => {
        const reg = /\B(#[a-z0-9]+)(\S|$)/ig;               //checking if there is tag in note
        const tag = title.match(reg)
        if (tag) {
            db.add({name: title, tag: tag[0]}).then(
                (event) => {
                    dispatch(AddNoteAC(title, tag[0]))
                    dispatch(AddTagAC(tag))
                }, (error) => {
                    console.log(error);
                },
            );
        } else
            add({name: title, tag: ''}).then((event) => {
                dispatch(AddNoteAC(title, ''))
            });

    }, [dispatch])

    if (filter === 'all') {
        dispatch(AddFilterAC(''))
    }

    return (
        <div className="App">
            <AddItemForm addItem={addNote}/>
            <FilterForm filter={filter} setFilter={setFilter} tags={tags}/>
            <NotesList/>
        </div>
    );
}

export default App;
