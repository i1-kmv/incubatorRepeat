import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    addTask: (title: string, id: string) => void
    changeTaskStatus: (taskid: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskid: string, title: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    id: string
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onClickAllHandler = () => {
        props.changeFilter("all", props.id)
    }

    const onClickActiveHandler = () => {
        props.changeFilter("active", props.id)
    }

    const onClickCompletedHandler = () => {
        props.changeFilter("completed", props.id)
    }

    const onChangeTodolistTitle = (newValue:string) => {
        props.changeTodolistTitle(newValue, props.id)
    }

    return (
        <div>
            <div>
                <div>
                    <EditableSpan title={props.title} onChangeTitleHandler={onChangeTodolistTitle} />
                    <IconButton aria-label="delete" onClick={() => props.removeTodolist(props.id)} color={"secondary"}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </div>

            </div>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (title:string) => {
                            props.changeTaskTitle(t.id, title, props.id)
                        }
                        return (
                            <li className={t.isDone ? 'is-done' : ''} key={t.id}>
                                <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler}/>
                                <EditableSpan title={t.title} onChangeTitleHandler={onChangeTitleHandler}/>
                                <IconButton aria-label="delete" onClick={onClickHandler} color={"secondary"}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </li>)
                    })
                }
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'outlined'}  onClick={onClickAllHandler}>
                    All
                </Button>
                <Button color="primary" variant={props.filter === 'active' ? 'contained' : 'outlined'} onClick={onClickActiveHandler}>
                    Active
                </Button>
                <Button color="secondary" variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={onClickCompletedHandler}>
                    Completed
                </Button>
            </div>
        </div>
    )
}

