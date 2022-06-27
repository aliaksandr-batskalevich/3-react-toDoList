import React, {useState} from 'react';
import {filterType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    callback: (id: number) => void
}

export function Todolist(props: PropsType) {

    let tasksToWatch: Array<TaskType> = props.tasks;

    let [filter, setFilter] = useState<filterType>("all");

    const filtered = (fil: filterType) => {
        setFilter(fil);
    }


    if (filter === "all") {
        tasksToWatch = props.tasks;
    } else if (filter === "active") {
        tasksToWatch = props.tasks.filter(el => !el.isDone)
    } else if (filter === "completed") {
        tasksToWatch = props.tasks.filter(el => el.isDone)
    }


    const onclickHandler = (id: number) => {
        props.callback(id);
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {tasksToWatch.map(el => {
                return (
                    <li key={el.id}>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                        <button onClick={() => {
                            onclickHandler(el.id)
                        }}>X
                        </button>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={() => filtered('all')}>All</button>
            <button onClick={() => filtered("active")}>Active</button>
            <button onClick={() => filtered("completed")}>Completed</button>
        </div>
    </div>
}
