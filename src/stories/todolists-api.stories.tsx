import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'f73346cf-43a9-46ef-bb80-ad0f8ec9758d',
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.1//todo-lists`, settings)
            .then(response => {
            setState(response.data);
        })
            .catch(error => {
                console.log(error);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
};

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    let data = {
        title: 'Hi, I am todolist)'
    };

    useEffect(() => {
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists`, data, settings)
            .then(response => {
                setState(response.data.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
};

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = "36f00af3-3909-44e3-b715-659401a191c0";
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
            .then(response => {
                setState(response.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
};

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    let todolistId = "60905185-11c9-4f42-a045-ea13f285d601";
    let data = {title: 'New Title!'}
    useEffect(() => {
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, data, settings)
            .then(response => {
                setState(response.data);
            })
    }, [])


    return <div> {JSON.stringify(state)}</div>
};
