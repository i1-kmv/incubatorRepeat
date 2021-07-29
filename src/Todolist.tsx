import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId:string) => void
    addTask: (title:string, todolistId: string) => void
    changeTaskStatus: (taskid:string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id:string) => void
    filter: FilterValuesType
    id: string
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement> ) => {
        setError(false)
        if (e.charCode === 13) {
            onAddNewTask(title)
        }
    }


    const onAddNewTask = (title:string) => {
        if (title.trim() !== ""){
            props.addTask(title.trim(), props.id)
            setTitle('')
        } else {
            setError(true)
        }
    }

    const onClickAllHandler = () => {
        props.changeFilter("all", props.id)
    }

    const onClickActiveHandler = () => {
        props.changeFilter("active",props.id)
    }

    const onClickCompletedHandler = () => {
        props.changeFilter("completed",props.id)
    }

    return (
    <div>
        <div>
            <h3>{props.title}  <button onClick={() => props.removeTodolist(props.id)}>x</button></h3>

        </div>
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} className={error ? "error" : "" }/>
            <button onClick={() => onAddNewTask(title)}>+</button>
            {error ? <div className="error-message">Field is required</div> : null}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => {props.removeTask(t.id, props.id)}
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {props.changeTaskStatus(t.id,e.currentTarget.checked,props.id)}
                return (
                <li className={t.isDone ? 'is-done' : ''} key={t.id}>
                <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler}/>
                <span>{t.title}</span>
                <button onClick={ onClickHandler }>x</button>
                </li>)})
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={ onClickAllHandler }>
                All
            </button>
            <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={ onClickActiveHandler }>
                Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={ onClickCompletedHandler }>
                Completed
            </button>
        </div>
    </div>
    )
}
