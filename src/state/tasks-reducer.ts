import {TaskStateType, TodolistType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskResponseType, todolistsAPI} from "../todolists-api";
import {Dispatch} from "redux";
import {TaskType} from "../Todolist";



type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType |
    ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType | SetTodolistsActionType | SetTasksActionType

type  RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

type AddTaskActionType = {
    type: 'ADD-TASK'
    task:TaskResponseType
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

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskResponseType>
    todolistId: string
}

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}


const initialState: TaskStateType = {
    [todolistId1]: [{id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}],

    [todolistId2]:
        [{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}]
}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let tasks = state[action.todolistId]
            let newTasks = tasks.filter(t => t.id !== action.taskId)
            state[action.todolistId] = newTasks
            return {...state}
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = action.task
            const tasks = stateCopy[newTask.todoListId]
            const newTasks = [newTask, ...tasks]
            stateCopy[newTask.todoListId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            let tasks = state[action.todolistId]
            state[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, isDone:action.isDone} : t)
            return {...state}
        }
        case 'CHANGE-TASK-TITLE': {
            let tasks = state[action.todolistId]
            state[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, title:action.title} : t)
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
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] =[]
            })
            return stateCopy
        }
        case 'SET-TASKS' : {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}


export const addTaskAC = (task: TaskResponseType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}

export const changeTaskStatusAC = (taskId: string,  isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId: taskId, isDone: isDone, todolistId: todolistId}
}

export const changeTaskTitleAC = (taskId: string,  title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId: taskId, title: title, todolistId: todolistId}
}

export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {  type: 'SET-TODOLISTS', todolists:todolists}
}

export const setTasksAC = (tasks: Array<TaskResponseType>, todolistId: string): SetTasksActionType => {
    return {  type: 'SET-TASKS', tasks, todolistId:todolistId }
}

export const fetchTasksTC = (id:string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(id)
            .then(res => {
                console.log(res.data)
                const action = setTasksAC(res.data.items, id)
                dispatch(action)
            })
    }
}

export const removeTaskTC =  (id:string, todolistId:string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(id,todolistId)
            .then(res => {
                    const action = removeTaskAC(id, todolistId)
                    dispatch(action)
                }
            )
    }
}

export const addTaskTC =  (task:TaskResponseType) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(task.id, task.title )
            .then(res => {
                    const action = addTaskAC(task)
                    dispatch(action)
                }
            )
    }
}