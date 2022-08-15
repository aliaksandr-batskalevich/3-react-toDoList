import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import {
    addTaskAC,
    addTodoListAC, changeFilterAC, changeTaskStatusAC, editTaskTitleAC,
    editTodoListTitleAC, removeTaskAC, removeTodolistAC,
    todoListsReducer,
    todoListsReducerActionType
} from "./reducers/todoListsReducer";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type StateType = {
    todoLists: Array<TodolistType>
    tasks: TasksStateType
}
export type actionType = todoListsReducerActionType

let todolistId1 = v1();
let todolistId2 = v1();

let startState: StateType = {
    todoLists: [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ],
    tasks: {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

function App() {

    let [state, stateDispatch] = useReducer<(state: StateType, action: actionType) => StateType>(todoListsReducer, startState);

    const addTodoListHandler = (title: string) => {
        let action = addTodoListAC(title);
        stateDispatch(action);
    };
    const editTodoListTitleHandler = (todoListId: string, newTitle: string) => {
        let action = editTodoListTitleAC(todoListId, newTitle);
        stateDispatch(action);
    };
    const removeTodolistHandler = (todoListId: string) => {
        let action = removeTodolistAC(todoListId);
        stateDispatch(action);
    };
    const changeFilterHandler = (todolistId: string, value: FilterValuesType) => {
        let action = changeFilterAC(todolistId, value);
        stateDispatch(action);
    };

    const removeTaskHandler = (todolistId: string, taskId: string) => {
        let action = removeTaskAC(todolistId, taskId);
        stateDispatch(action);
    };
    const addTaskHandler = (todolistId: string, title: string) => {
        let action = addTaskAC(todolistId, title);
        stateDispatch(action);
    };
    const changeTaskStatusHandler = (todolistId: string, taskId: string, isDone: boolean) => {
        let action = changeTaskStatusAC(todolistId, taskId, isDone);
        stateDispatch(action);
    };
    const editTaskTitleHandler = (todoListId: string, taskId: string, data: string) => {
        let action = editTaskTitleAC(todoListId, taskId, data);
        stateDispatch(action);
    };


    let renderTodoLists = state.todoLists.map(tl => {
        let allTodoListTasks = state.tasks[tl.id];
        let tasksForTodoList = allTodoListTasks;
        if (tl.filter === 'active') {
            tasksForTodoList = state.tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === 'completed') {
            tasksForTodoList = state.tasks[tl.id].filter(t => t.isDone)
        }
        return (
            <Todolist
                id={tl.id}
                title={tl.title}
                tasks={tasksForTodoList}
                removeTask={removeTaskHandler}
                changeFilter={changeFilterHandler}
                addTask={addTaskHandler}
                changeTaskStatus={changeTaskStatusHandler}
                removeTodolist={removeTodolistHandler}
                filter={tl.filter}
                editTaskTitle={editTaskTitleHandler}
                editTodoListTitle={editTodoListTitleHandler}
            />
        )

    });

    return (
        <div className="App">
            <AddItemForm callBack={addTodoListHandler}/>
            {renderTodoLists}
        </div>
    );
}

export default App;
