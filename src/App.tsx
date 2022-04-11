import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from './Todolist';

function App() {

    let tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "ReactJS", isDone: false}
    ]

    let [arr, setArr] = useState<Array<TaskType>>(tasks1)

    const removeTask = (remId: number) => {
        setArr(arr.filter(el => el.id !== remId))
    }

    // let [filter, setFilter] = useState<string>('All')
    //
    // let filteredTask = arr;
    //
    // if (filter === 'Active') {
    //     filteredTask = arr.filter(el => !el.isDone)
    // } else if (filter === 'Completed') {
    //     filteredTask = arr.filter(el => el.isDone)
    // }
    //
    // const changeFilter = (filterID: string) => {
    //     setFilter(filterID);
    // }

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={arr} removeTask={removeTask}/>
        </div>
    );
}

export default App;
