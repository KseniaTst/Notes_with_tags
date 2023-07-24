import {Paper} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {useState} from "react";
import styles from './notesList.module.css'


type PropsType = {
    id: string
    title: string
    tag: string
    removeNote: (id: string) => void
    changeNoteTitle: (id: string, title: string) => void
}

export const Note = (props: PropsType) => {
    const {id, title, tag, removeNote, changeNoteTitle} = props

    let [editMode, setEditMode] = useState(false);

    const onRemoveNote = () => {
        removeNote(id)
    }

    const onChangeNoteTitle = (title: string) => {
        changeNoteTitle(id, title)
    }
    const activateEditMode = (editMode: boolean) => {
        setEditMode(editMode)
    }

    return (
        <Paper className={styles.note}>
            <h3 className={styles.text}>
                <EditableSpan value={title}
                              onChange={onChangeNoteTitle}
                              editMode={editMode}
                              activateEditMode={activateEditMode}
                />
            </h3>
            <div className={styles.tagsContainer}>
                {tag}
            </div>
            <EditIcon onClick={() => activateEditMode(true)}/>
            <DeleteIcon onClick={onRemoveNote}/>
        </Paper>
    )
}