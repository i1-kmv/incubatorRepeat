import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import {ControlPoint} from "@material-ui/icons";

export type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormType) => {

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
            <TextField value={title}
                       onChange={onChangeHandler}
                       helperText={error}
                       onKeyPress={onKeyPressHandler}
                       variant={'outlined'}
                       error={!!error} size={'small'}
                       label={'type value'}
            />
            <IconButton
                onClick={() => addItem(title)}
                color={"primary"}
            >
                <ControlPoint/>
            </IconButton>
            {error ? <div className="error-message">Field is required</div> : null}
        </div>
    )
})
