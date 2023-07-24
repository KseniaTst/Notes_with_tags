import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@mui/material";


type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    editMode: boolean
    activateEditMode: (editMode: boolean) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [title, setTitle] = useState(props.value);


    const activateEditMode = () => {
        props.activateEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        props.activateEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.activateEditMode(false)
            props.onChange(title);
        }
    }

    return props.editMode
        ?    <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} onKeyPress={onKeyPressHandler} />
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
}
