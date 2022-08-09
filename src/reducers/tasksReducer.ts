import {actionType, stateType} from "../App";
import {v1} from "uuid";

const REMOVE_TASK = 'REMOVE-TASK';
const ADD_TASK = 'ADD-TASK';
const SET_DONE = 'SET-DONE';

export type removeTaskActionType = ReturnType<typeof removeTaskAC>;
export type addTaskActionType = ReturnType<typeof addTaskAC>;
export type setDoneActionType = ReturnType<typeof setDoneAC>;

export const tasksReducer = (state: stateType, action: actionType) => {
    switch (action.type) {
        case REMOVE_TASK: {
            state = state.filter(t => t.id !== action.payload.id)
            return state;
        }
        case ADD_TASK: {
            let newTask = {id: v1(), title: action.payload.title, isDone: false};
            return [newTask, ...state];
        }
        case SET_DONE: {
            return state.map(t => t.id === action.payload.id ? {...t, isDone: action.payload.checked} : t);
        }
        default: {
            return state;
        }
    }
}

export const removeTaskAC = (id: string) => {
    return (
        {
            type: REMOVE_TASK,
            payload: {
                id: id
            }
        } as const
    )
};
export const addTaskAC = (title: string) => {
    return (
        {
            type: ADD_TASK,
            payload: {
                title: title
            }
        } as const
    )
};
export const setDoneAC = (id: string, checked: boolean) => {
    return (
        {
            type: SET_DONE,
            payload: {
                id: id,
                checked: checked
            }
        } as const
    )
};