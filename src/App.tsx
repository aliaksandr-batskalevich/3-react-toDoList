import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type filterType = 'all' | 'active' | 'completed'

function App() {

    const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "TS", isDone: true},
        {id: 4, title: "ReactJS", isDone: false}
    ]

    let [tasks, setTasks] = useState<Array<TaskType>>(tasks1);
    // let [filter, setFilter] = useState<filterType>("all");

    const removeTask = (id: number) => {
        setTasks(tasks.filter(el => el.id !== id))
    }

    // const filtered = (fil: filterType) => {
    //     setFilter(fil);
    // }
    //
    // let tasksToWatch: Array<TaskType> = tasks;
    //
    // if (filter === "all") {
    //     tasksToWatch = tasks;
    // } else if (filter === "active") {
    //     tasksToWatch = tasks.filter(el => !el.isDone)
    // } else if (filter === "completed") {
    //     tasksToWatch = tasks.filter(el => el.isDone)
    // }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                callback={removeTask}
            />
        </div>
    );
}

export default App;
