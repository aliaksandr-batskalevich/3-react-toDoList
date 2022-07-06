import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type FullInputPropsType = {
    placeHolderName: string
    nameOfButton: string
    addTaskCallback: (inputData: string) => void
}

export const FullInput = (props: FullInputPropsType) => {

    let [inputData, setInputData] = useState<string>('');

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputData(event.currentTarget.value)
    }
    const addTaskAndNull = () => {
        props.addTaskCallback(inputData);
        setInputData('');
    }
    const onKeyPressInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && inputData.length != 0 && addTaskAndNull();
    }
    const onclickButtonHandler = () => {
        inputData.length != 0 && addTaskAndNull();
    }

    return (
        <div>
            <input
                value={inputData}
                onChange={onChangeInputHandler}
                onKeyPress={onKeyPressInputHandler}
                placeholder={props.placeHolderName}
            />
            <Button
                title={props.nameOfButton}
                callback={onclickButtonHandler}
            />
        </div>
    )
}