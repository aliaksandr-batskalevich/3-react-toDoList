import React, {useState} from 'react';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (remID: number) => void
}

export function Todolist(props: PropsType) {

    let [filter, setFilter] = useState<string>('All')

    let filteredTask = props.tasks;

    if (filter === 'Active') {
        filteredTask = props.tasks.filter(el => !el.isDone)
    } else if (filter === 'Completed') {
        filteredTask = props.tasks.filter(el => el.isDone)
    }

    const changeFilter =(filterID: string) => {
        setFilter(filterID);
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {filteredTask.map((item) => {
                return (
                    <li key={item.id}>
                        <input type="checkbox" checked={item.isDone}/>
                        <span>{item.title}</span>
                        <button onClick={() => props.removeTask(item.id)}>X</button>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={() => {changeFilter('All')}}>All</button>
            <button onClick={() => {changeFilter('Active')}}>Active</button>
            <button onClick={() => {changeFilter('Completed')}}>Completed</button>
        </div>
    </div>
}
