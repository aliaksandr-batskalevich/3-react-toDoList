import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type todoListType = {
    id: string
    title: string
    filterValue: FilterValuesType
}

function App() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<todoListType>>([
        {id: todoListID1, title: 'What to learn?', filterValue: "active"},
        {id: todoListID2, title: 'What to buy?', filterValue: "all"},
    ]);

    let [tasks, setTasks] = useState({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: "Macbook", isDone: true},
            {id: v1(), title: "IPhone", isDone: true},
            {id: v1(), title: "AirPods", isDone: false},
            {id: v1(), title: "IPad", isDone: false},
            {id: v1(), title: "IPod", isDone: false}
        ]
    });

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(el => el.id !== todoListID));
        delete tasks[todoListID];
    }

    function removeTask(todoListID: string, id: string) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== id)});
    }

    function addTask(todoListID: string, title: string) {
        setTasks({...tasks, [todoListID]: [{id: v1(), title: title, isDone: false}, ...tasks[todoListID]]});
    }

    function changeStatus(todoListID: string, taskId: string, isDone: boolean) {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(el => el.id === taskId ? {...el, isDone: isDone} : el)
        });
    }

    function changeFilter(todoListID: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, filterValue: value} : el));
    }

    let todoListRender = todoLists.map(el => {

        return (
            <Todolist
                key={el.id}
                todoListID={el.id}
                title={el.title}
                tasks={tasks[el.id]}
                removeTodoList={removeTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={el.filterValue}
            />
        )
    })


    return (
        <div className="App">
            {todoListRender}
        </div>
    );
}

export default App;
