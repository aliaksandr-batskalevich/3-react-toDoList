import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import {FullInput} from "./components/FullInput";
import {UniversalInput} from "./components/UniversalInput";

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
    callbackAddTask: (data: string) => void
    callbackSetCheckbox: (idIn: string) => void
}

export function Todolist(props: PropsType) {

    // state for UniversalInput
    let [inputData, setInputData] = useState<string>('');
    // functions for UniversalInput
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputData(event.currentTarget.value)
    }
    const addTaskAndNull = () => {
        props.callbackAddTask(inputData);
        setInputData('');
    }
    const onKeyPressInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && inputData.length != 0 && addTaskAndNull();
    }
    const onclickButtonHandler = () => {
        inputData.length != 0 && addTaskAndNull();
    }


    const addTaskCallbackHandler = (inputData: string) => {
        props.callbackAddTask(inputData)
    }
    const chFilHandler = (filterValues: FilterValuesType) => {
        props.changeFilter(filterValues);
    }
    const remTaskButHandler = (taskId: string) => {
        props.removeTask(taskId);
    }
    const onClickInputHandler = (idIn: string) => {
        props.callbackSetCheckbox(idIn);
    }

    let tasks = props.tasks.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone} onClick={() => onClickInputHandler(t.id)}/>
                <span>{t.title}</span>
                <Button title={'x'} callback={() => remTaskButHandler(t.id)}/>
            </li>
        )
    })

    return <div>
        <h3>{props.title}</h3>
        {/* FullInput */}
        <FullInput
            placeHolderName={'write task...'}
            nameOfButton={'+'}
            addTaskCallback={addTaskCallbackHandler}
        />
        {/* UniversalInput */}
        <UniversalInput
            value={inputData}
            onChange={onChangeInputHandler}
            onKeyPress={onKeyPressInputHandler}
            placeholder={'write task in universe...'}
        />
        <Button title={'add'} callback={onclickButtonHandler}/>

        <ul>
            {tasks}
        </ul>
        <div>
            <Button title={'All'} callback={() => {
                chFilHandler('all')
            }}/>
            <Button title={'Active'} callback={() => {
                chFilHandler('active')
            }}/>
            <Button title={'Completed'} callback={() => {
                chFilHandler('completed')
            }}/>
        </div>
    </div>
}