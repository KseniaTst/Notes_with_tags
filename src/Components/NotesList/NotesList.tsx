import {ChangeNoteTitleAC, NoteType, RemoveNoteAC} from "../../store/notes-reducer";
import {Note} from "./Note";
import style from "./notesList.module.css"
import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AddTagAC} from "../../store/tags-reducer";
import {AppRootStateType} from "../../store/store";
import {useIndexedDB} from "react-indexed-db-hook";

export const NotesList = () => {

    const {deleteRecord, update} = useIndexedDB("notes");

    const notes = useSelector<AppRootStateType, NoteType[]>(state => state.notes.notes)
    const filter = useSelector<AppRootStateType, string>(state => state.notes.filter)

    const dispatch = useDispatch()

    useEffect(() => {                   //add tags for filter in redux
        const filters: string[] = []
        notes.map(note => {
            if (note.tag.length > 0) filters.push(note.tag)
        })
        dispatch(AddTagAC(filters))
    }, [notes])

    const removeNote = useCallback((id: string) => {
        deleteRecord(id).then(res => {
            dispatch(RemoveNoteAC(id))
        })
    }, [dispatch])

    const changeNoteText = (id: string, text: string) => {
        const reg = /\B(#[a-z0-9]+)(\S|$)/ig;                   //checking if there is tag in new note text
        const tags = text.match(reg)
        if (tags) {
            update({id: id, name: text, tag: tags[0]}).then(res => {
                dispatch(ChangeNoteTitleAC(id, text, tags[0]))
                dispatch(AddTagAC(tags))
            })

        } else {
            update({id: id, name: text, tag: ''}).then(res => {
                dispatch(ChangeNoteTitleAC(id, text))
            })
        }
    }

    let filterredNotes = notes

    if (filter && filter.length > 0) {
        filterredNotes = notes.filter(note => {
            return note.tag === filter
        })
    }


    return (
        <div className={style.notesList}>
            {filterredNotes.map(note => {
                return <Note key={note.id}
                             id={note.id}
                             title={note.name}
                             tag={note.tag}
                             removeNote={removeNote}
                             changeNoteTitle={changeNoteText}/>
            })}
        </div>
    )
}