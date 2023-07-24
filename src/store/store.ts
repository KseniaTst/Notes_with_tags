import {combineReducers, createStore} from "redux";
import {NotesReducer} from "./notes-reducer";
import {TagsReducer} from "./tags-reducer";

const rootReducer = combineReducers({
    notes: NotesReducer,
    tags: TagsReducer
})

export type AppRootStateType= ReturnType<typeof rootReducer>

export const store= createStore(rootReducer)