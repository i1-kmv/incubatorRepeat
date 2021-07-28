import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title:string) => void
    changeTaskStatus: (taskid:string, isDone: boolean) => void
    filter: FilterValuesType
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
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError(true)
        }
    }

    const onClickAllHandler = () => {
        props.changeFilter("all")
    }

    const onClickActiveHandler = () => {
        props.changeFilter("active")
    }

    const onClickCompletedHandler = () => {
        props.changeFilter("completed")
    }

    return (
    <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} className={error ? "error" : "" }/>
            <button onClick={() => onAddNewTask(title)}>+</button>
            {error ? <div className="error-message">Field is required</div> : null}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => {props.removeTask(t.id)}
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {props.changeTaskStatus(t.id,e.currentTarget.checked)}
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
