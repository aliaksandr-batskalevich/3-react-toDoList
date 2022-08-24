import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistAC, RemoveTodolistAC} from "./todolists-reducer";

export type TasksActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof RemoveTodolistAC>

const REMOVE_TASK = 'REMOVE-TASK';
const ADD_TASK = 'ADD-TASK';
const CHANGE_STATUS = 'CHANGE-STATUS';
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE';
const ADD_TODOLIST = 'ADD-TODOLIST';

export const tasksReducer = (state: TasksStateType, action: TasksActionsType) => {
    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            };
        case ADD_TASK:
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todolistId]]
            };
        case CHANGE_STATUS:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    isDone: action.payload.isDone
                } : el)
            };
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.newTitle
                } : el)
            };
        case ADD_TODOLIST:
            return {...state, [action.payload.newTodolistId]: []};
        case "REMOVE-TODOLIST":
            let newState = {...state};
            delete newState[action.id];
            return newState;
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: REMOVE_TASK,
        payload: {todolistId, taskId}
    } as const
};
export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: ADD_TASK,
        payload: {todolistId, title}
    } as const
};
export const changeStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: CHANGE_STATUS,
        payload: {todolistId, taskId, isDone}
    } as const
};
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: CHANGE_TASK_TITLE,
        payload: {todolistId, taskId, newTitle}
    } as const
};

