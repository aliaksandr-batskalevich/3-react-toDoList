import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (newTitle: string) => void
    checkedTask: (id: string) => void
}

export function Todolist(props: PropsType) {

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let resultTasksArr = props.tasks;

    if (filter === "active") {
        resultTasksArr = props.tasks.filter(t => !t.isDone);
    } else if (filter === "completed") {
        resultTasksArr = props.tasks.filter(t => t.isDone);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const [newTitle, setNewTitle] = useState<string>('');

    const onClickButtonHandler = () => {
        props.addTask(newTitle);
        setNewTitle('');
    }

    const onKeyInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickButtonHandler();
        }
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value);
    }

    const changeFilterHandler = (value: FilterValuesType) => {
        changeFilter(value);
    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(id);
    }

    const checkedTaskHandler = (id: string) => {
        props.checkedTask(id);
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle} onChange={onChangeInputHandler} onKeyPress={onKeyInputHandler}/>
            <button onClick={onClickButtonHandler}>+</button>
        </div>
        <ul>
            {
                resultTasksArr.map(t => <li key={t.id}>
                    <input onClick={() => {checkedTaskHandler(t.id)}} type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => {
                        removeTaskHandler(t.id)
                    }}>x
                    </button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={() => {
                changeFilterHandler('all')
            }}>
                All
            </button>
            <button onClick={() => {
                changeFilterHandler('active')
            }}>
                Active
            </button>
            <button onClick={() => {
                changeFilterHandler('completed')
            }}>
                Completed
            </button>
        </div>
    </div>
}
