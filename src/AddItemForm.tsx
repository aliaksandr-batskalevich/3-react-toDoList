import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    };

    const styleForButton = {
        maxWidth: '38px',
        minWidth: '38px',
        maxHeight: '38px',
        minHeight: '38px',
    }

    return <div>
        <TextField
            id="outlined-basic"
            size={'small'}
            label={error ? error : 'Add title...'}
            variant="outlined"
            error={!!error}

            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
        />

        <Button
            variant="contained"
            size={'small'}
            style={styleForButton}
            color={"secondary"}
            onClick={addItem}
        >
            +
        </Button>
    </div>
}
