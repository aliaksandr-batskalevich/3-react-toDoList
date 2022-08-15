import {actionType, FilterValuesType, StateType, TodolistType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";

export type todoListsReducerActionType = ReturnType<typeof addTodoListAC>
    | ReturnType<typeof editTodoListTitleAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof editTaskTitleAC>

const ADD_TODOLIST = 'ADD-TODOLIST';
const EDIT_TODOLIST_TITLE = 'EDIT-TODOLIST-TITLE';
const REMOVE_TODOLIST = 'REMOVE-TODOLIST';
const CHANGE_FILTER = 'CHANGE-FILTER';

const REMOVE_TASK = 'REMOVE-TASK';
const ADD_TASK = 'ADD-TASK';
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS';
const EDIT_TASK_TITLE = 'EDIT-TASK-TITLE';

export const todoListsReducer = (state: StateType, action: actionType) => {
    switch (action.type) {
        case ADD_TODOLIST:
            let todoListIdNew = v1();
            let newTodoList: TodolistType = {id: todoListIdNew, title: action.payload.title, filter: 'all'};
            return {
                ...state,
                todoLists: [...state.todoLists, newTodoList],
                tasks: {...state.tasks, [todoListIdNew]: []}
            };
        case EDIT_TODOLIST_TITLE:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => tl.id === action.payload.todoListId ? {
                    ...tl,
                    title: action.payload.newTitle
                } : tl)
            };
        case REMOVE_TODOLIST:
            let newTasks = state.tasks;
            delete newTasks[action.payload.todoListId];
            return {
                ...state,
                todoLists: state.todoLists.filter(tl => tl.id !== action.payload.todoListId),
                tasks: newTasks
            };
        case CHANGE_FILTER:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => tl.id === action.payload.todolistId ? {
                    ...tl,
                    filter: action.payload.value
                } : tl)
            };
        case REMOVE_TASK :
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.payload.todolistId]: state.tasks[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
                }
            };
        case ADD_TASK:
            let newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false};
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.payload.todolistId]: [newTask, ...state.tasks[action.payload.todolistId]]
                }
            };
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.payload.todolistId]: state.tasks[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                        ...t,
                        isDone: action.payload.isDone
                    } : t)
                }
            };
        case EDIT_TASK_TITLE:
            return {...state, tasks: {...state.tasks, [action.payload.todoListId]: state.tasks[action.payload.todoListId].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.data} : t)}};
        default:
            return state
    }
};

export const addTodoListAC = (title: string) => {
    return {type: ADD_TODOLIST, payload: {title}} as const
};
export const editTodoListTitleAC = (todoListId: string, newTitle: string) => {
    return {type: EDIT_TODOLIST_TITLE, payload: {todoListId, newTitle}} as const
};
export const removeTodolistAC = (todoListId: string) => {
    return {type: REMOVE_TODOLIST, payload: {todoListId}} as const
};
export const changeFilterAC = (todolistId: string, value: FilterValuesType) => {
    return {type: CHANGE_FILTER, payload: {todolistId, value}} as const
};

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: REMOVE_TASK, payload: {todolistId, taskId}} as const;
};
export const addTaskAC = (todolistId: string, title: string) => {
    return {type: ADD_TASK, payload: {todolistId, title}} as const;
};
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {type: CHANGE_TASK_STATUS, payload: {todolistId, taskId, isDone}} as const;
};
export const editTaskTitleAC = (todoListId: string, taskId: string, data: string) => {
    return {type: EDIT_TASK_TITLE, payload: {todoListId, taskId, data}} as const;
};