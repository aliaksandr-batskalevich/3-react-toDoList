import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

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
}

export function Todolist(props: PropsType) {

    let [inputData, setInputData] = useState<string>('');

    const addTaskAndNull = () => {
        props.callbackAddTask(inputData);
        setInputData('');
    }
    const onclickButtonHandler = () => {
        inputData.length != 0 && addTaskAndNull();
    }
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputData(event.currentTarget.value)
    }
    const onKeyPressInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && inputData.length != 0 && addTaskAndNull();
    }
    const chFilHandler = (filterValues: FilterValuesType) => {
        props.changeFilter(filterValues);
    }
    const remTaskButHandler = (taskId: string) => {
        props.removeTask(taskId);
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={inputData} onChange={onChangeInputHandler} onKeyPress={onKeyPressInputHandler}
                   placeholder={'write task...'}/>
            <button onClick={onclickButtonHandler}>+</button>
        </div>
        <ul>
            {props.tasks.map(t => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button title={'x'} callback={() => remTaskButHandler(t.id)}/>
                        </li>
                    )
                })}
        </ul>
        <div>
            <Button title={'All'} callback={() => {chFilHandler('all')}}/>
            <Button title={'Active'} callback={() => {chFilHandler('active')}}/>
            <Button title={'Completed'} callback={() => {chFilHandler('completed')}}/>
        </div>
    </div>
}