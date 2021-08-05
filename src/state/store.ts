import {combineReducers, createStore} from "redux"
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TaskStateType, TodolistType} from "../AppWithRedux";
import {TaskType} from "../Todolist";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

// type AppRootState = {
//     todolists: Array<TodolistType>
//     tasks: TaskStateType
// }

type AppRootState  = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)