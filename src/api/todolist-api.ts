import axios from "axios";

type TodolistType = {
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

export const authAPI = {
    authMe() {
        return instance.get(`auth/me`);
    },
    logIn(email: string, password: string, rememberMe: boolean, captcha: boolean) {
        let body = {email, password, rememberMe, captcha};
        return instance.post(`/auth/login`, body);
    },
};

export const todolistAPI = {
    getTodoLists() {
        return instance.get<Array<TodolistType>>(`todo-lists`)
            .then(response => response.data);
    },
    createTodolist(title: string) {
        return instance.post(`todo-lists`, {title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`);
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put(`todo-lists/${todolistId}`, {title});
    },
    reorderTodoList(todolistId: string, putAfterItemId: string) {
        let body = {putAfterItemId};
        return instance.put(`todo-lists/${todolistId}/reorder`, body);
    },
};

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get(`todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        let body = {title};
        return instance.post(`todo-lists/${todolistId}/tasks`, body);
    },
    updateTask(
        todolistId: string,
        taskId: string,
        title: string,
        description: string,
        completed: boolean,
        status: number,
        priority: number,
        startDate: string,
        deadline: string,
    ) {
        let body = {title, description, completed, status, priority, startDate, deadline};
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, body);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    reorderTask(todolistId: string, taskId: string, putAfterItemId: string) {
        let body = {putAfterItemId};
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}/reorder`, body);
    },
};



