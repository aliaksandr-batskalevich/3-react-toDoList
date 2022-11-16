import axios from "axios";

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': 'f73346cf-43a9-46ef-bb80-ad0f8ec9758d',
    }
});

export const todolistAPI = {
    getTodoLists() {
            return instance.get<Array<TodolistType>>(`todo-lists`)
                .then(response => response.data);
        },
    createTodolist(title: string) {
        return instance.post(`todo-lists`, {title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`/todo-lists/${todolistId}`);
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put(`/todo-lists/${todolistId}`, {title});
    }

};