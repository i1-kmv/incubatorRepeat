import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from "@material-ui/icons/Delete";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskid: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskid: string, title: string, todolistId: string) => void
    t: TaskType
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = () => {
        props.removeTask(props.t.id, props.todolistId)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.t.id, e.currentTarget.checked, props.todolistId)
    }
    const onChangeTitleHandler = useCallback((title: string) => {
        props.changeTaskTitle(props.t.id, title, props.todolistId)
    },[props.t.id, props.todolistId, props.changeTaskTitle])

    return (
        <div className={props.t.isDone ? 'is-done' : ''} key={props.t.id}>
            <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small"/>}
                checkedIcon={<CheckBoxIcon fontSize="small"/>}
                name="checkedI" checked={props.t.isDone} onChange={onChangeStatusHandler}
            />
            <EditableSpan title={props.t.title} onChangeTitleHandler={onChangeTitleHandler}/>
            <IconButton aria-label="delete" onClick={onClickHandler} color={"primary"}>
                <DeleteIcon fontSize="small"/>
            </IconButton>
        </div>)
})