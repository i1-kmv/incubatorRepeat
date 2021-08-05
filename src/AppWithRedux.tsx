import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key:string] : Array<TaskType>
}

export function AppWithRedux() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchTodolistsReducer] = useReducer(todolistsReducer,[{
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
    )

    let [tasks, dispatchTasksReducer] = useReducer(tasksReducer,
        {
            [todolistId1]: [{id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false}],

            [todolistId2]:
                    [{id: v1(), title: "HTML&CSSd", isDone: true},
                    {id: v1(), title: "JSd", isDone: true},
                    {id: v1(), title: "ReactJSd", isDone: false},
                    {id: v1(), title: "Rest APId", isDone: false},
                    {id: v1(), title: "GraphQLd", isDone: false}]
        }
        )
    ;


    const removeTask = (id: string, todolistId:string) => {
        const action = removeTaskAC(id, todolistId)
        dispatchTasksReducer(action)
    }

    const addTask = (title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId)
        dispatchTasksReducer(action)
    }

    const changeTaskStatus = (taskid: string, isDone: boolean, todolistId:string) => {
        const action = changeTaskStatusAC(taskid, isDone, todolistId)
        dispatchTasksReducer(action)
    }

    const changeTaskTitle = (taskid: string, title: string, todolistId:string) => {
        const action = changeTaskTitleAC(taskid, title, todolistId)
        dispatchTasksReducer(action)
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatchTodolistsReducer(action)
    }

    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        const action = changeTodolistTitleAC(newTitle, todolistId)
        dispatchTodolistsReducer(action)
    }

    const removeTodolist = (id:string) => {
        const action = removeTodolistAC(id)
        dispatchTodolistsReducer(action)
        dispatchTasksReducer(action)
    }

    const addTodolist = (title:string) => {
        const action = addTodolistAC(title)
        dispatchTodolistsReducer(action)
        dispatchTasksReducer(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"  color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" >
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '15px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id]
                        let tasksForTodolist = allTodolistTasks;
                        if (tl.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                        }
                        if (tl.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                        }


                        return (
                            <Grid item>
                                <Paper style={{padding:"10px"}}>
                                    <Todolist key={tl.id}
                                              id={tl.id}
                                              title={tl.title}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              changeTaskTitle={changeTaskTitle}
                                              filter={tl.filter}
                                              removeTodolist={removeTodolist}
                                              changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}


