import {TaskStateType, TodolistType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {v1} from "uuid";



type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

type  RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

type ChangeTaskStatusActionType = {
    type : 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}

type ChangeTaskTitleActionType = {
    type : 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}


export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let tasks = state[action.todolistId]
            let newTasks = tasks.filter(t => t.id !== action.taskId)
            state[action.todolistId] = newTasks
            return {...state}
        }
        case 'ADD-TASK': {
            let tasks = state[action.todolistId]
            let task =  {id: '4', title: action.title, isDone:false }
            let newTasks = [task, ...tasks]
            state[action.todolistId] = newTasks
            return {...state}
        }
        case 'CHANGE-TASK-STATUS': {
            let tasks = state[action.todolistId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return {...state}
        }
        case 'CHANGE-TASK-TITLE': {
            let tasks = state[action.todolistId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return {...state}
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error('It is bad')
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}


export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}

export const changeTaskStatusAC = (taskId: string,  isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId: taskId, isDone: isDone, todolistId: todolistId}
}

export const changeTaskTitleAC = (taskId: string,  title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId: taskId, title: title, todolistId: todolistId}
}