import {v1} from "uuid"

export type NoteType = {
    id: string
    name: string
    tag: string
}
type AddNoteAT = {
    id: string
    type: 'ADD-NOTE'
    name: string
    tag: string
}
type FetchNoteAT = {
    type: 'FETCH-NOTES'
    notes: Array<NoteType>
}
export type RemoveNoteAT = {
    type: 'REMOVE-NOTE',
    id: string
}
export type ChangeNoteTitleAT = {
    type: 'CHANGE-TEXT'
    id: string
    name: string
    tag?: string
}
export type AddFilterAT = {
    type: 'ADD-FILTER'
    filter: string
}

type ActionType = AddNoteAT | FetchNoteAT | RemoveNoteAT | ChangeNoteTitleAT | AddFilterAT
type InitialStateType = {
    notes: Array<NoteType>
    filter: string
}

const initialState = {
    notes: [],
    filter: ''
}

export const NotesReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "ADD-NOTE":
            if (action.tag.length > 0) {
                return {
                    ...state,
                    notes: [{
                        id: action.id,
                        name: action.name,
                        tag: action.tag
                    }, ...state.notes]
                }
            }
            return {
                ...state,
                notes: [{
                    id: action.id,
                    name: action.name,
                    tag: ''
                }, ...state.notes]
            }
        case 'FETCH-NOTES' :
            return {
                ...state,
                notes: [...action.notes, ...state.notes]
            }

        case 'REMOVE-NOTE': {
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.id)
            }
        }
        case 'CHANGE-TEXT': {
            const note = state.notes.find(tl => tl.id === action.id);
            if (action.tag && note) {                               //if note is found then change its tag
                note.tag = action.tag
            }
            return {                                                //if there is no tag in note  return note with changed title
                ...state,
                notes: state.notes.map(
                    note => note.id === action.id ? {
                            ...note,
                            name: action.name
                        }
                        : note)
            }
        }
        case 'ADD-FILTER':
            return {
                ...state,
                filter: action.filter
            }
        default:
            return state
    }
}

export const AddNoteAC = (text: string, tag: string): AddNoteAT => ({type: 'ADD-NOTE', id: v1(), name:text, tag})
export const FetchNotesAC = (notes: Array<NoteType>): FetchNoteAT => ({type: 'FETCH-NOTES', notes})
export const RemoveNoteAC = (noteId: string): RemoveNoteAT => ({type: 'REMOVE-NOTE', id: noteId})
export const ChangeNoteTitleAC = (noteId: string, title: string, tag?: string): ChangeNoteTitleAT => ({
    type: 'CHANGE-TEXT',
    id: noteId,
    name: title,
    tag
})

export const AddFilterAC = (filter: string): AddFilterAT => ({type: 'ADD-FILTER', filter})

