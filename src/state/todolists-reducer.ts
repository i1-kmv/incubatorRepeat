import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


type ActionsType = RemoveTodolistActionType | AddTodolistActionType |  ChangeTodolistTitleActionType |  ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title:string
    todolistId: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title:string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter:FilterValuesType
}

export let todolistId1 = v1()
export let todolistId2 = v1()


const initialState: Array<TodolistType> = [{
    id: todolistId1,
    title: 'What to learn',
    filter: 'all'
},
    {
        id: todolistId2,
        title: 'What to bye',
        filter: 'all'
    }
]

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state,{id: action.todolistId, title: action.title,filter:'all'}];
            }
        case 'CHANGE-TODOLIST-TITLE': {
           let newState=[...state]
           let todolist =  newState.find(el => el.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }

            return newState
        }
        case 'CHANGE-TODOLIST-FILTER':{
            let newState = [...state]
            let todolist = newState.find(t => t.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return newState

        }
        default:
            return state
    }
}


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {  type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {  type: 'CHANGE-TODOLIST-TITLE', id:id, title: title}
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {  type: 'CHANGE-TODOLIST-FILTER', id:id, filter: filter}
}