import {TodolistType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type:string
    [key:string] : any
}

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state,{id: action.id, title: action.title,filter:'all'}];
            }
        case 'CHANGE-TODOLIST-TITLE': {
           let newState=[...state]
           let todolist =  newState.find(el => el.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }

            return newState
        }
        default:
            throw new Error('It is bad')
    }
}