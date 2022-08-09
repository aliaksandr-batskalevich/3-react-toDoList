import React, {useReducer, useState} from 'react';
import './App.css'
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {
    addTaskAC,
    addTaskActionType,
    removeTaskAC,
    removeTaskActionType,
    setDoneAC, setDoneActionType,
    tasksReducer
} from "./reducers/tasksReducer";
import {changeFilterAC, changeFilterActionType, filterReducer} from "./reducers/filterReducer";

export type FilterValuesType = "all" | "active" | "completed";
type taskType = {
    id: string
    title: string
    isDone: boolean
}
export type stateType = Array<taskType>

export type actionType = removeTaskActionType | addTaskActionType | setDoneActionType | changeFilterActionType;

function App() {

    let [tasks, tasksDispatch] = useReducer(tasksReducer, [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    function removeTask(id: string) {
        tasksDispatch(removeTaskAC(id));
    };
    function addTask(title: string) {
        tasksDispatch(addTaskAC(title));
    };
    const setDone = (id: string, checked: boolean) => {
        tasksDispatch(setDoneAC(id, checked));
    };


    let [filter, filterDispatch] = useReducer(filterReducer, "all");

    function changeFilter(value: FilterValuesType) {
        filterDispatch(changeFilterAC(value));
    }


    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      setDone={setDone}
                      filter={filter}/>
        </div>
    );
}

export default App;
