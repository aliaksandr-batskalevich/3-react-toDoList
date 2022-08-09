import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type errorType = null | string

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    setDone: (id: string, checked: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<errorType>(null)

    const makeError = (error: errorType) => {
        setError(error)
    }

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim());
            setTitle("");
        } else {
            makeError('Title is required');
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        makeError(null);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask();
        }
    }
    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");
    const onChangeInputHandler = (id: string, checked: boolean) => {
        props.setDone(id, checked);
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? s.error : ''}
            />
            <button onClick={addTask}>+</button>
        </div>
        {error && <div className={s.errorMessage}>{error}</div>}
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id} className={t.isDone ? s.isDone : ''}>
                        <input type="checkbox" checked={t.isDone}
                               onChange={(event) => onChangeInputHandler(t.id, event.currentTarget.checked)}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === "all" ? s.activeFilter : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === "active" ? s.activeFilter : ''} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === "completed" ? s.activeFilter : ''} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
