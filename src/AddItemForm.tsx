import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement> ) => {
        setError(false)
        if (e.charCode === 13) {
            addItem(title)
        }
    }


    const addItem = (title:string) => {
        if (title.trim() !== ""){
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError(true)
        }
    }
    return (
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} className={error ? "error" : "" }/>
            <button onClick={() => addItem(title)}>+</button>
            {error ? <div className="error-message">Field is required</div> : null}
        </div>
    )
}
