import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type todoListsType = {
    id: string
    title: string
    filter: FilterValuesType
};
type taskType = {
    id: string
    title: string
    isDone: boolean
}
type tasksType = {
    [id: string]: Array<taskType>
}

function App() {

    const todoListId1 = v1();
    const todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<todoListsType>>([    // GOOD)))
        {
            id: todoListId1,
            title: 'What to learn?',
            filter: 'all'
        },
        {
            id: todoListId2,
            title: 'What to buy?',
            filter: 'all'
        }
    ])

    let [tasks, setTasks] = useState<tasksType>({
            [todoListId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [todoListId2]: [
                {id: v1(), title: "Macbook", isDone: true},
                {id: v1(), title: "IPhone", isDone: true},
                {id: v1(), title: "AirPods", isDone: false},
                {id: v1(), title: "IPad", isDone: false},
                {id: v1(), title: "IPod", isDone: false},
            ]
        });

    const removeTodoList = (id: string) => {
        setTodoLists(todoLists.filter(el => el.id !== id));
        delete tasks[id];
    };

    function removeTask(id: string, taskId: string) {                               // GOOD))))
        setTasks({...tasks, [id]: tasks[id].filter(t => t.id != taskId)});
    };

    function addTask(id: string, title: string) {                                   // GOOD))))
        setTasks({...tasks, [id]: [{id: v1(), title: title, isDone: false}, ...tasks[id]]});
    };

    function changeStatus(id: string, taskId: string, isDone: boolean) {            // GOOD))))
        setTasks({...tasks, [id]: tasks[id].map( el => el.id === taskId ? {...el, isDone: isDone} : el)})
    };

    function changeFilter(id: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(el => el.id === id ? {...el, filter: value} : el));
    };

    let todoListsRender = todoLists.map(el => {

        let tasksForTodolist = tasks[el.id];
        if (el.filter === "active") {
            tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
        }
        if (el.filter === "completed") {
            tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
        }

        return (
            <Todolist key={el.id}
                      id={el.id}
                      title={el.title}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      removeTodoList={removeTodoList}
                      filter={el.filter}
            />
        )
    });


    return (
        <div className="App">
            {todoListsRender}
        </div>
    );
};

export default App;
