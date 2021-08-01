import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key:string] : Array<TaskType>
}

export function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([{
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

    let [tasks, setTasks] = useState<TaskStateType>(
        {
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
        )
    ;


    const removeTask = (id: string, todolistId:string) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id);
        setTasks({...tasks});
    }

    const addTask = (title: string, todolistId: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks});
    }

    const changeTaskStatus = (taskid: string, isDone: boolean, todolistId:string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === taskid)
        if (task) {
            task.isDone = isDone
        }
       setTasks({...tasks});
    }

    const changeTaskTitle = (taskid: string, title: string, todolistId:string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === taskid)
        if (task) {
            task.title = title
        }
        setTasks({...tasks});
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let newTodolist = todolists.find(tl => tl.id === todolistId)
        if (newTodolist) {
            newTodolist.filter = value
            setTodolists([...todolists])
        }
    }

    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        let newTodolist = todolists.find(tl => tl.id === todolistId)
        if (newTodolist) {
            newTodolist.title = newTitle
            setTodolists([...todolists])
        }
    }
    const removeTodolist = (id:string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    const addTodolist = (title:string) => {
        let newTodolistId = v1()
        let newTodolist : TodolistType = {id: newTodolistId, title: title,filter:'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks,[newTodolistId] : []})

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

export default App;
