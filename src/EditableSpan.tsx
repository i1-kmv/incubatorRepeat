import React, {ChangeEvent, useState} from "react";
export type EditableSpanPropsType = {
    title: string
    onChangeTitleHandler: (newValue:string) => void
}


export const EditableSpan = (props:EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const activeEditMode = () => {
        setEditMode(true)
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.onChangeTitleHandler(title)
    }

    return (
        editMode ? <input type="text" value={title} autoFocus onChange={changeTitle} onBlur={deactivateEditMode} /> : <span onDoubleClick={activeEditMode}>{title}</span>
    )
}