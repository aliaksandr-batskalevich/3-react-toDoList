import React, {ChangeEvent, useState, KeyboardEvent} from "react";

type EditableSpanPropsType = {
    universalId: string
    title: string
    editCallBackTask: (universalId: string, data: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    let [edit, setEdit] = useState(false);
    let [newValue, setNewValue] = useState<string>(props.title);

    const editHandler = () => {
        setEdit(!edit);
        edit && props.editCallBackTask(props.universalId, newValue)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewValue(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && editHandler();
    }

    return (
        edit
            ? <input autoFocus onKeyPress={onKeyPressHandler} onBlur={editHandler} value={newValue} onChange={onChangeHandler}/>
            : <span onDoubleClick={editHandler}>{props.title}</span>
        // <input value={props.title}/>
    )
}