import React, {ChangeEvent, useCallback, useEffect} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import {Task} from "./Task";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./state/tasks-reducer";
import {TaskResponseType} from "./todolists-api";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    addTask: (task: TaskResponseType) => void
    removeTodolist: (id: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskid: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskid: string, title: string, todolistId: string) => void
    filter: FilterValuesType
    id: string
}

export const Todolist = React.memo((props: PropsType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    },[dispatch])

    const addTask = useCallback((task) => {
        props.addTask(task.title)
    }, [props.addTask, props.id])

    const onClickAllHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [props.changeFilter, props.id])

    const onClickActiveHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    }, [props.changeFilter, props.id])

    const onClickCompletedHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
    }, [props.changeFilter, props.id])

    const onChangeTodolistTitle = useCallback((newValue: string) => {
        props.changeTodolistTitle(newValue, props.id)
    }, [props.changeTaskTitle, props.id])

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    return (
        <div>
            <div>
                <div>
                    <EditableSpan title={props.title} onChangeTitleHandler={onChangeTodolistTitle}/>
                    <IconButton aria-label="delete" onClick={() => props.removeTodolist(props.id)}
                                color={"primary"}>
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                </div>

            </div>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map(t => {
                        return (
                            <Task changeTaskStatus={props.changeTaskStatus}
                                  changeTaskTitle={props.changeTaskTitle}
                                  removeTask={props.removeTask}
                                  t={t}
                                  todolistId={props.id}
                                  key={t.id}
                            />
                        )
                    })
                }
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'outlined'} onClick={onClickAllHandler}
                        style={{margin: '3px'}}>
                    All
                </Button>
                <Button color="primary" variant={props.filter === 'active' ? 'contained' : 'outlined'}
                        onClick={onClickActiveHandler} style={{margin: '3px'}}>
                    Active
                </Button>
                <Button color="secondary" variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={onClickCompletedHandler} style={{margin: '3px'}}>
                    Completed
                </Button>
            </div>
        </div>
    )
})





