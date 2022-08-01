import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    callBack: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = ({callBack}) => {

    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const addTaskFn = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            callBack(newTitle);
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
            addTaskFn();
        }
    };



    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTaskFn}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}