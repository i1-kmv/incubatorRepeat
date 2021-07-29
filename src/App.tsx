import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

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

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let newTodolist = todolists.find(tl => tl.id === todolistId)
        if (newTodolist) {
            newTodolist.filter = value
            setTodolists([...todolists])
        }
    }

    const removeTodolist = (id:string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    return (
        <div className="App">

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

                    <Todolist key={tl.id}
                              id={tl.id}
                              title={tl.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              filter={tl.filter}
                              removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
