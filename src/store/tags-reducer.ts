
const initialState: Array<string> = ['']

type ActionType = AddTagAT


export const TagsReducer = (state: Array<string> = initialState, action: ActionType): Array<string> => {
    switch (action.type) {
        case 'ADD-TAG': {
            for (let i =0; i < action.tags.length; ++i){
                if(action.tags[i].length > 0 && state.indexOf(action.tags[i]) === -1) {
                    return [...state, action.tags[i]]
                }
            }
            return state
        }
        default:
            return state
    }
}

type AddTagAT = ReturnType<typeof AddTagAC>

export const AddTagAC = (tags:string[]) => ({type: 'ADD-TAG',  tags} as const)

